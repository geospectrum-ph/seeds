var router = require('express').Router();
const path = require('path');
// var gdal = require('gdal-async'); // Package used to read shapefiles

const fs = require("fs") // Package used for reading file directories
const decompress = require('decompress'); // Package used for decompressing ZIP file
const { promisify } = require('util')

require('dotenv').config();

const multer = require("multer") // Package used for handling storage locally
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');

const sld2legend = require('../routes/Sld-Legend/sld2legend')

// Date format library
// Source: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
var dateFormat = require('dateformat');

// Data Models for Object Schemas
let Metadata = require('../models/metadata.model');
let Shapefile = require('../models/shapefile.model');
let Barangay = require('../models/barangay.model');
let Table = require('../models/table.model');
let Image = require('../models/image.model');

let Disease = require('../models/disease-models/disease.model');
let Disease_Barangay = require('../models/disease-models/disease.barangay.model');

let Employment_Points = require('../models/job-models/employment.point.model');
let Employment_Barangay = require('../models/job-models/employment.barangay.model');

let Commercial_Points = require('../models/commercial-models/commercial.point.model');
let Commercial_Barangay = require('../models/commercial-models/commercial.barangay.model');

let Household_Population = require('../models/household-models/household.population.js')
let Household_Shape = require('../models/household-models/household.shape.js')

let LandUse = require('../models/landuse.model');

let Style = require('../models/style.model');
const { response } = require('express');

const tempFolder = path.join(__dirname, '../public/uploads')

// create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        // In here you have access to the request and also to the body object
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

// Initialize Local Storage in remote directory
const localstorage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
});

const localupload = multer({
  storage: localstorage,
});

// Given a filename, return the file extension
function extractExtension(filename){
  return(filename.split('.')[filename.split('.').length - 1])
}

// Function to generate Metadata IDs
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// Converts a comma-delimited string to an array
function stringToArray(str) {
  var i;
  var res = str.split(",")
  for (i = 0; i < res.length; i++) {
    res[i] = res[i].replace('[','').replace(/"/g,'').replace(']','');
  };
  return(res);
}

// Empty directory by deleting files inside
const emptyDir = async () => {
  let temp_path = path.join(__dirname, "..", "\\public\\uploads");

  let files = fs.readdirSync(temp_path);

  for (const file of files) {
    fs.unlinkSync(path.join(temp_path, "\\", file));
  }
}

// Function to convert CSV files into objects
// credits to (Jim): https://www.geeksforgeeks.org/how-to-convert-csv-to-json-file-having-comma-separated-values-in-node-js/
function CSVtoObject(pathToObjectCSV) {

  // Reading the file using default fs npm package
  csv = fs.readFileSync(pathToObjectCSV);

  // Convert the data to String and split it in an array
  var array = csv.toString().split("\n");

  // All the rows of the CSV will be converted to JSON objects which
  // will be added to result in an array
  let result = [];

  // The array[0] contains all the header columns so we store them
  // in headers array
  let headers = array[0].split(",").map(Function.prototype.call, String.prototype.trim)

  // Since headers are separated, we need to traverse remaining n-1 rows.
  for (let i = 1; i <= (array.length-1); i++) {
      let obj = {}

      let content = array[i].split(",").map(Function.prototype.call, String.prototype.trim)
      // Create an empty object to later add values of the current row to it
      // Declare string str as current array value to change the delimiter and
      // store the generated string in a new string s

      // For each header, if the value contains multiple comma separated data, then we
      // store it in the form of array otherwise directly the value is stored
      for (let j = 0; j < (headers.length); j++) {
          obj[headers[j]] = content[j]
      }

      // Add the generated object to our result array
      result.push(obj)
  }
  return result;
}

// Ito ay para sa general na pagselect ng Shapes based sa intersection ng Shapes (geojson) at pointOrPolygon (geojson)
// Source: https://stackoverflow.com/questions/27820794/how-to-use-geointersects-in-mongodb-properly
// Source: https://docs.mongodb.com/manual/reference/operator/query/geoIntersects/
async function findShapesUsingPointOrPolygon(Shapes, pointOrPolygon){

  var foundShapes2 = [];
  await Shapes.find({ // hanapin yung shapes gamit geospatial query na $geointersects
    "geometry": {
      "$geoIntersects": {
        "$geometry": pointOrPolygon
      }
    }
  }).then(foundShapes => {foundShapes2 = foundShapes})
  .catch(err => {});

  if(foundShapes2.length > 0){ // kung may laman
    return foundShapes2[0].properties.brgy_id
  }
}

// This function is used to generate a unique metadata ID in the metadata collection
async function generateMetadataID(){
  var i = 0;
  var metadataCount = await Metadata.estimatedDocumentCount({});
  var newMetadataID = "MTD"+pad(metadataCount, 3)
  var dummyObject = [{"id": "MTD000"}]

  while (dummyObject.length !== 0) {
    i++
    newMetadataID = "MTD"+pad(metadataCount+i, 3)
    dummyObject = await Metadata.find({"id": newMetadataID})
  }

  return newMetadataID
}

// Function to conver dd/mm/yyyy to yyyymmdd
function dd_mm_yyyy2yyyymmdd(dd_mm_yyyy){
  try {
    var split_date = dd_mm_yyyy.split('/')
    var yyyymmdd = split_date[2] + split_date[1] + split_date[0]
    return yyyymmdd
  }
  catch (err) { return ''}
}

function getColor(){ 
  return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)'
}

hex_color = getColor();
// console.log(hex_color);

// console.log(inputLayer_)

// Function to upload CSV: Catch All
async function CSV_General_Upload(result, metadataID, res) {

  var bulk = Table.collection.initializeUnorderedBulkOp();

  result.forEach((feature) => {
    var newItem = new Table({ 
      type: 'Feature',
      properties: feature
    });

    // add metadataID in the properties
    newItem.properties.mtd_id = metadataID;

    // idagdag yung SEED component tsaka map name, need pa ng addl property to link to metadata
    newItem.properties.social = social;
    newItem.properties.economic = economic;
    newItem.properties.environmental = environmental;
    newItem.properties.demographic = demographic;
    newItem.properties.mapName = mapName;

    bulk.insert(newItem);
  })
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  });
  res.status(200);
}

// Function to upload CSV: Disease - Barangay
async function CSV_Disease_Brgy(result, metadataID, res) {

  var bulk = Disease_Barangay.collection.initializeUnorderedBulkOp();

  result.forEach(async (feature) => {
    var newItem = new Disease_Barangay({
      disease_id: feature.id,
      disease: feature.disease,
      brgy_id: feature.brgy_psgc, // PSGC Code
      date: feature.date,
      new_active: feature.new_active,
      new_death: feature.new_deceased,
      new_recovered: feature.new_recovered,
      remarks: feature.Remarks,
      mtd_id: metadataID
    });
    bulk.insert(newItem);
  })
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  });
  res.status(200).send("Updated Barangays");
}

// Function to upload CSV: Disease - Points
async function CSV_Disease_Points(result, metadataID, res) {
  const dothis = async () => {
    result.forEach(async (feature) => {
      var point = {
        "type": "Point",
        "coordinates": [parseFloat(feature.lon), parseFloat(feature.lat)]
      }
      var brgy_id = await findShapesUsingPointOrPolygon(Barangay, point)
      var newItem = new Disease({
        type: 'Feature',
        properties:{
          disease_id: feature.case,
          brgy_id: brgy_id,
          disease: feature.disease,
          date: feature.date,
          status: feature.status,
          remarks: feature.remarks,
          mtd_id: metadataID
        }, geometry: point
      });
      newItem.save();
    })
  }
  await dothis().then(() => {
    emptyDir()
    // console.log('directory removed!')
  })
  res.status(200).send("Updated Points"); // tapos na si post request
}

// Function to upload CSV: Employment - Barangay
async function CSV_Employment_Brgy(result, metadataID, res) {
  var bulk = Employment_Barangay.collection.initializeUnorderedBulkOp();
  result.forEach(async (feature) => {
    var newItem = new Employment_Barangay({
      employment_id: feature.id,
      job_class: feature.job_class,
      brgy_id: feature.brgy_psgc, // PSGC Code
      date: feature.date,
      female: feature.Female,
      male: feature.Male,
      total: feature.Total,
      remarks: feature.Remarks,
      mtd_id: metadataID
    });
    bulk.insert(newItem);
  })
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  })
  res.status(200).send("Updated Barangays");
}

// Function to upload CSV: Employment - Points
async function CSV_Employment_Points(result, metadataID, res) {

  const dothis = async () => {
    result.forEach(async (feature) => {
      var point = {
        "type": "Point",
        "coordinates": [parseFloat(feature.lon), parseFloat(feature.lat)]
      }
      var brgy_id = await findShapesUsingPointOrPolygon(Barangay, point)
      var newItem = new Employment_Points({ 
        type: 'Feature',
        properties:{
          employment_id: feature.id,
          brgy_id: brgy_id,
          job_class: feature.job_class,
          date: feature.date,
          sex: feature.sex,
          remarks: feature.remarks,
          mtd_id: metadataID
        },
        geometry: point
      });
      newItem.save();
    })
  }
  await dothis().then(() => {
    emptyDir()
    // console.log('directory removed!')
  })
  res.status(200).send("Updated Points");
}

// Function to upload CSV: Household - Population [SAMUEL]
async function CSV_Household_Population(result, metadataID, res) {
  var bulk = Household_Population.collection.initializeUnorderedBulkOp();
  result.forEach(async (feature) => {
    //for adjusting
    var newItem = new Household_Population({
      housing_unit_serial_number: feature['Serial_number'], // Foreign key
      name: feature['Name'],  // full name?
      land_use: feature['Use'],
      is_household_head: feature['Head'], 
      gender: feature['Gender'],
      date_of_birth: dd_mm_yyyy2yyyymmdd(feature['Birthday']), // YYYYMMDD
      occupation: feature['Occupation'], 
      profession: feature['Profession'], 
      mtd_id: metadataID
    });
    bulk.insert(newItem);
  })
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  });
  res.status(200).send("Updated Barangays");
}

// Function to upload SHP: Household [SAMUEL]
async function SHP_Household(inputLayer_, generatedID, sld_txt, res) {
  var bulk = Household_Shape.collection.initializeUnorderedBulkOp();

  const properties_ = {
    "sld_txt": sld_txt,
    "mtd_id": generatedID
  }
  
  "properties" in inputLayer_ ? inputLayer_.properties = { ...inputLayer_.properties, ...properties_ } : inputLayer_.properties = properties_;
  
  const style_ = {
    "color" : "black",
    "fillColor" : hex_color,
    "fillOpacity": 1
  }

  "style" in inputLayer_ ? inputLayer_.style = { ...inputLayer_.style, ...style_ } : inputLayer_.style = style_;

  bulk.insert(inputLayer_);

  // console.log(inputLayer);

  // inputLayer_.forEach((feature) => {
  //   if (feature.getGeometry()){
  //     var fields = feature.fields.toObject();
  //     //for adjusting
  //     var newItem = {
  //         type: 'Feature',
  //         properties: fields,
  //         geometry: feature.getGeometry().toObject()
  //     };
  //     newItem.properties.sld_txt = sld_txt;
  //     newItem.properties.mtd_id = generatedID;
  //     bulk.insert(newItem);
  //   } else { 

  //    }
  // })
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  });
  res.json('Shapefile uploaded!').status(200);
}

// WORKING ON THIS
// Function to upload CSV: Commercial - Barangay
async function CSV_Commercial_Brgy(result, metadataID, res) {
  var bulk = Commercial_Barangay.collection.initializeUnorderedBulkOp();
  result.forEach(async (feature) => {
    var newItem = new Commercial_Barangay({
      commercial_id: feature.id,
      inst_class: 'Commercial', // commercial institution
      brgy_id: feature.code, // PSGC Code
      institution_count: feature['Count'],
      capitalization_total: feature['Total Capitalization'], // total capitalization
      employees_total: feature['Total Employees'], // total number of employees
      class: feature['Type'],
      date: feature.date, // Date of upload?
      remarks: feature.Remarks,
      mtd_id: metadataID
    });
    bulk.insert(newItem);
  })
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  });
  res.status(200).send("Updated Barangays");
}

// Function to upload CSV: Commercial - Points
async function CSV_Commercial_Points(result, metadataID, res) {
  const dothis = async () => {
    result.forEach(async (feature) => {
      var point = {
        "type": "Point",
        "coordinates": [parseFloat(feature.lon), parseFloat(feature.lat)]
      }
      var brgy_id = await findShapesUsingPointOrPolygon(Barangay, point)
      var newItem = new Commercial_Points({  //
        type: 'Feature',
        properties:{
          commercial_id: feature.id,
          inst_class:'Commercial',
          brgy_id: brgy_id, // PSGC Code
          date: feature['Expiry Date'], // (Expiration?) date on registration
          name: feature['Firm Name'],
          owner: feature['Owner'],
          employees: feature['Employees'],
          capitalization: feature['Capitalization'],
          class: feature['Type'],
          remarks: feature.remarks,
          mtd_id: metadataID
        },
        geometry: point
      });
      newItem.save();
    })
  }
  await dothis().then(() => {
    emptyDir()
    // console.log('directory removed!')
  })
  res.status(200).send("Updated Points");
}

async function SHP_Barangay(inputLayer_, generatedID, sld_txt, sld_legend, res) {

  // ibig sabihin, gagawin niya yung operation ng sabay-sabay/unordered para mas mabilis
  // however, if sobrang dami, matagal pa rin (approx 6-8 mins for 170k records)
  var bulk = Barangay.collection.initializeUnorderedBulkOp();
  // console.log("inputLayer");
  // console.log(inputLayer.features);

  // inputLayer_.forEach((feature) => {
  //   if (feature.getGeometry()){
  //     var fields = feature.fields.toObject();
  //     var newItem = {
  //       type: 'Feature',
  //       properties: {
  //         brgy_city_id: fields.NAME_2,
  //         brgy_id: fields.GID_3,
  //         brgy_name: fields.NAME_3,
  //         brgy_lat: fields.brgy_lat,
  //         brgy_long: fields.brgy_long,
  //         brgy_id_2: fields.GID_3
  //       },
  //       geometry: feature.getGeometry().toObject(),
  //       style: sld_legend ? sld_legend.filter((x) => x.name === fields.NAME_3)[0] : null
  //     };

  //     // Add sld_txt in the properties
  //     newItem.properties.sld_txt = sld_txt; //if there's no sld file, this value is "na"
    
  //     // add metadataID in the properties
  //     newItem.properties.mtd_id = generatedID;

  //     // isave sa bulk for executing
  //     bulk.insert(newItem);
  //   }
  // })

  const properties_ = {
    "sld_txt": sld_txt,
    "mtd_id": generatedID
  }
  
  "properties" in inputLayer_ ? inputLayer_.properties = { ...inputLayer_.properties, ...properties_ } : inputLayer_.properties = properties_;
  
  const style_ = {
    "color" : "black",
    "fillColor" : hex_color,
    "fillOpacity": 1
  }

  "style" in inputLayer_ ? inputLayer_.style = { ...inputLayer_.style, ...style_ } : inputLayer_.style = style_;

  bulk.insert(inputLayer_);

  // perform operation
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  });
  res.json('Shapefile uploaded!').status(200);
}

// Function to upload SHP: Land Use
async function SHP_LandUse(inputLayer_, generatedID, sld_txt, res) {

  // ibig sabihin, gagawin niya yung operation ng sabay-sabay/unordered para mas mabilis
  // however, if sobrang dami, matagal pa rin (approx 6-8 mins for 170k records)
  var bulk = LandUse.collection.initializeUnorderedBulkOp();

  // console.log(inputLayer);

  // inputLayer_.forEach((feature) => {
  //   var fields = feature.fields.toObject();
  //   var newItem = {  // gawa ng object (GeoJSON)
  //       type: 'Feature',
  //       properties: {
  //         Landuse: fields.Landuse,
  //         area: fields.Area,
  //         date_start: fields.date_start,
  //         date_end: fields.date_end
  //       },
  //       geometry: feature.getGeometry().toObject()
  //   };

  //   // Add sld_txt in the properties
  //   newItem.properties.sld_txt = sld_txt; //if there's no sld file, this value is "na"
   
  //   // add metadataID in the properties
  //   newItem.properties.mtd_id = generatedID;

  //   // isave sa bulk for executing
  //   bulk.insert(newItem);
  // })

  const properties_ = {
    "sld_txt": sld_txt,
    "mtd_id": generatedID
  }
  
  "properties" in inputLayer_ ? inputLayer_.properties = { ...inputLayer_.properties, ...properties_ } : inputLayer_.properties = properties_;
  
  const style_ = {
    "color" : "black",
    "fillColor" : hex_color,
    "fillOpacity": 1
  }

  "style" in inputLayer_ ? inputLayer_.style = { ...inputLayer_.style, ...style_ } : inputLayer_.style = style_;

  bulk.insert(inputLayer_);

  // perform operation
  await bulk.execute().then(() => {
    emptyDir()
    // console.log('directory removed!')
  });
  res.json('Shapefile uploaded!').status(200);
}

// Function to upload SHP: General Upload
async function SHP_GeneralUpload(inputLayer_, generatedID, sld_txt, res) {
  // ibig sabihin, gagawin niya yung operation ng sabay-sabay/unordered para mas mabilis
  // however, if sobrang dami, matagal pa rin (approx 6-8 mins for 170k records)
  var bulk = Shapefile.collection.initializeOrderedBulkOp();

  // Object.keys(inputLayer_).forEach((feature) => {
  //   console.log(feature);
  //   var newItem = {  // gawa ng object (GeoJSON)
  //     type: 'Feature',
  //     properties: {
  //       ...feature.properties,
  //       "sld_txt": sld_txt,
  //       "mtd_id": generatedID
  //     },
  //     geometry: feature.geometry
  //   };

  //   // Add sld_txt in the properties
  //   // console.log(sld_txt);
  //   // newItem.properties.sld_txt = sld_txt; //if there's no sld file, this value is "na"
  
  //   // // add metadataID in the properties
  //   // console.log(generatedID);
  //   // newItem.properties.mtd_id = generatedID;

  //   // isave sa bulk for executing
  //   console.log(newItem);
  //   bulk.insert(newItem);
  // })
  //   console.log(feature);


    // var newItem = {  // gawa ng object (GeoJSON)
    //   type: inputLayer_.type,
    //   properties: {
    //     ...inputLayer_.properties,
    //     "sld_txt": sld_txt,
    //     "mtd_id": generatedID
    //   },
    //   geometry: inputLayer_.geometry

    // const properties_ = {
    //   "sld_txt": sld_txt,
    //   "mtd_id": generatedID
    // }
    
    // "properties" in inputLayer_ ? inputLayer_.properties = { ...inputLayer_.properties, ...properties_ } : inputLayer_.properties = properties_;
    
    const style_ = {
      "color" : "black",
      "fillColor" : hex_color,
      "fillOpacity": 1
    }

    "style" in inputLayer_ ? inputLayer_.style = { ...inputLayer_.style, ...style_ } : inputLayer_.style = style_;

    // inputLayer_.properties.style = sld_legend ? sld_legend.filter((x) => x.name === fields.NAME_3)[0] : null;
// console.log(inputLayer_)
    // console.log(inputLayer_);
    bulk.insert(inputLayer_);

  // perform operation
  await bulk.execute().then(() => {
    emptyDir();
    // console.log('directory removed!')
  });
  res.json('Shapefile uploaded!').status(200); 
}

/* POST REQUEST - UPLOAD SHP DATA. (using gdal) */
router.route('/shp').post(localupload.single("file"), async (req, res) => { // "localupload.single("file") => pagkatanggap
                                                                       //   ng file from frontend, isasave niya
                                                                       //   sa temporary storage folder using multer
  // accessing the file
  const myFile = req.file;                                 // get the file
  const extension = extractExtension(myFile.originalname); // just to check if the file is a shapefile

  if(extension !== 'zip'){
    res.status(400).send('Please upload the entire shapefile as a zipfile. Thank you!');
  }
  var filename = myFile.filename;
  var sld_name = null; //initialize as null
  if(extension == 'zip'){
    await decompress(myFile.path, myFile.destination).then(files => { // decompressing the zip file

      filename = files.filter(fn => fn.path.endsWith('.shp'))[0].path; // hanapin yung .shp na file sa .zip
      try { //try if there's an sld file in the zip file being uploaded
        sld_name = files.filter(fn => fn.path.endsWith('.sld'))[0].path; // hanapin yung .sld na file sa .zip
      } catch(err) { //if there's no sld file, set sld_name to null
        sld_name = null;
      };
      fs.unlinkSync(myFile.path)
    });
  }

  // kunin si file path ni .shp file
  var pathToObjectSHP = path.join(__dirname, '../', myFile.destination, filename) || path.join(__dirname, '../assets/sample-data/Bacoor_brgy_sld.zip');
  if (sld_name != null) { //if sld_name exists
    var pathToObjectSLD = path.join(__dirname, '../', myFile.destination, sld_name) //path to sld object
    var sld_txt = fs.readFileSync(pathToObjectSLD).toString() //read sld file as string
    var sld_legend = await sld2legend.sld2legend(sld_txt); // convert to legend jsons
  } else {
    var sld_txt = 'na'; //not available
    var sld_legend = []; // empty array
  }
  // SEED Properties
  var social = req.body.social || true;
  var economic = req.body.economic || true;
  var environmental = req.body.environmental || true;
  var demographic = req.body.demographic || true;
  var mapName = req.body.mapName || myFile.originalname;

  var dataType = req.body.dataType || extension;

  var keywords = stringToArray(req.body.keywords) || [];
  var description = req.body.description || "No description provided";
  var language = req.body.language || "No language provided";
  var license = req.body.license || "No license provided";
  var doi = req.body.doi || "No DOI provided";
  var attribution = req.body.attribution || "No attribution provided";
  var regions = req.body.regions || "No regions provided";
  var dqs = req.body.dqs || "No Data Quality Statement provided";
  var restrictions = req.body.restrictions || "No restrictions provided";
  var constraints = req.body.constraints || "No constraints provided";
  var details = req.body.details || "";

  // use GDAL package to open the shapefile
  // var dataset = gdal.open(pathToObjectSHP);

  // var shp = require('shpjs');

// shp("shapefile").then(function(geojson){
// console.log(geojson);
// }).catch( (reason) => {
// console.log('Handle rejected promise ('+reason+') here.');
// });
const initGdalJs = require('gdal3.js/node');

const Gdal = await initGdalJs();

  async function getFile(path_){
    const opened = await Gdal.open([path_]); // https://gdal3.js.org/docs/module-f_open.html
    const options = [ // https://gdal.org/programs/ogr2ogr.html#description
      '-f', 'GeoJSON',
      '-t_srs', 'EPSG:4326',
     ];
const converted = await Gdal.ogr2ogr(opened.datasets[0], options, "output"); 
const dataByte =await Gdal.getFileBytes(converted);

const jsonString = Buffer.from(dataByte).toString('utf8');
// const parsedData = JSON.parse(jsonString);

    Gdal.close(opened);
    // return(parsedData);

    return jsonString;

    // (async() {
      // Convert path to GeoJSON.
      // let data = await ogr2ogr(path_)
      // console.log(data)
    
      // // Convert GeoJSON object to ESRI Shapefile stream.
      // let {stream} = await ogr2ogr(data, {format: 'ESRI Shapefile'})
    
      // // Convert ESRI Shapefile stream to KML text.
      // let {text} = await ogr2ogr(stream, {format: 'KML'})
      // console.log(text)
    // })()
    //   return(
  //     await shapefile_.open(path_)
  //   .then(source => {
  //     return(
  //     source.read()
  //     .then((result) => {
  //       return (result.value);
  //     })
  //     .catch(error => console.error(error.stack)))
  //   })
  //   .catch(error => console.error(error.stack))
  // );
    // let parse = path.split("\\").pop();
    // console.log(parse);
    // return (
    //   await shp(path_)
    //     .then(
    //       (response) => { console.log(response); }
    //     )
    //     .catch(
    //       (error) => { console.log(error); }
    //     )
    // );
  }



// console.log(pathToObjectSHP);
// var dataset = null;
// console.log(dataset);
// var inputLayer = dataset.layers.get(0);

var inputLayer = await getFile(pathToObjectSHP);
  
  // check how many items are in the metadata collection, also in preparation for metadataID generation
  var generatedID = await generateMetadataID();

  var newMetadata = new Metadata({ 
    "name": mapName,
    "id": generatedID,
    "type": dataType,
    "social": social,
    "economic": economic,
    "environmental": environmental,
    "demographic": demographic,
    "upload_date": dateFormat(new Date().toLocaleString('en-US', { timeZone: 'Asia/Brunei' }), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
    "properties": {
      "keywords": keywords,
      "description": description,
      "language": language,
      "license": license,
      "doi": doi,
      "attribution": attribution,
      "regions": regions,
      "dqs": dqs,
      "restrictions": restrictions,
      "constraints": constraints,
      "details": details,
    }
  });

  // save in metadata collection
  newMetadata.save();

  // create a style object
  var newStyle = new Style({
    "name": mapName,
    "metadataID": generatedID,
    "style": sld_legend,
    "text": sld_txt
  });
  // save in styles collection
  newStyle.save();

  // if (keywords.includes('barangay') && keywords.includes('boundary') && keywords.length === 2) 
  //   SHP_Barangay(inputLayer, generatedID, sld_txt, sld_legend, res)
  // else if (keywords.includes('land use') && keywords.includes('boundary') && keywords.length === 2) 
  //   SHP_LandUse(inputLayer, generatedID, sld_txt, res)
  // else if (keywords.includes('household') && keywords.includes('boundary') && keywords.length === 2) 
  //   SHP_Household(inputLayer, generatedID, sld_txt, res)
  // else { 

  // console.log(inputLayer);

    SHP_GeneralUpload(inputLayer, generatedID, sld_txt, res)
  // }
});

/* POST REQUEST - UPLOAD CSV DATA. (using gdal) */
// credits to (Jim): https://www.geeksforgeeks.org/how-to-convert-csv-to-json-file-having-comma-separated-values-in-node-js/
router.route('/csv').post(localupload.single("file"), async (req, res) => {
  // accessing the file
  const myFile = req.file;
  const extension = extractExtension(myFile.originalname);
  var filename = myFile.filename;

  if(extension !== 'csv'){
    res.status(400).send('Please upload a csv file. Thank you!');
  }
    // path to object
  var pathToObjectCSV = path.join(__dirname, '../', myFile.destination, filename) || path.join(__dirname, '../assets/sample-data/Bacoor_city.csv');

  var result = CSVtoObject(pathToObjectCSV, req.body)

  var social = req.body.social || true;
  var economic = req.body.economic || true;
  var environmental = req.body.environmental || true;
  var demographic = req.body.demographic || true;
  var mapName = req.body.mapName || myFile.originalname;

  var dataType = req.body.dataType || extension;

  var keywords = stringToArray(req.body.keywords) || [];
  var description = req.body.description || "No description provided";
  var language = req.body.language || "No language provided";
  var license = req.body.license || "No license provided";
  var doi = req.body.doi || "No DOI provided";
  var attribution = req.body.attribution || "No attribution provided";
  var regions = req.body.regions || "No regions provided";
  var dqs = req.body.dqs || "No Data Quality Statement provided";
  var restrictions = req.body.restrictions || "No restrictions provided";
  var constraints = req.body.constraints || "No constraints provided";
  var details = req.body.details || "";

  var generatedID = await generateMetadataID();
  var newMetadata = new Metadata({
    "name": mapName,
    "id": generatedID,
    "type": dataType,
    "social": social,
    "economic": economic,
    "environmental": environmental,
    "demographic": demographic,
    "upload_date": dateFormat(new Date().toLocaleString('en-US', { timeZone: 'Asia/Brunei' }), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
    "properties": {
      "keywords": keywords,
      "description": description,
      "language": language,
      "license": license,
      "doi": doi,
      "attribution": attribution,
      "regions": regions,
      "dqs": dqs,
      "restrictions": restrictions,
      "constraints": constraints,
      "details": details,
    }
  });
  newMetadata.save();

  //  Checking which collection it will save file to based on keywords
  if (keywords.includes('disease') && keywords.includes('barangay') && keywords.length === 2) 
    CSV_Disease_Brgy(result, generatedID, res)
  else if (keywords.includes('disease') && keywords.includes('points') && keywords.length === 2) 
    CSV_Disease_Points(result, generatedID, res)
  else if (keywords.includes('employment') && keywords.includes('barangay') && keywords.length === 2)
    CSV_Employment_Brgy(result, generatedID, res)
  else if (keywords.includes('employment') && keywords.includes('points') && keywords.length === 2) 
    CSV_Employment_Points(result, generatedID, res)
  else if (keywords.includes('commercial') && keywords.includes('barangay') && keywords.length === 2) 
    CSV_Commercial_Brgy(result, generatedID, res)
  else if (keywords.includes('commercial') && keywords.includes('points') && keywords.length === 2) 
    CSV_Commercial_Points(result, generatedID, res)
  else if (keywords.includes('household') && keywords.includes('points') && keywords.length === 2) 
    CSV_Household_Population(result, generatedID, res)
  else { 
    CSV_General_Upload(result, generatedID, res)
  }

});

/* POST: Upload a single image/file to Image collection */
router.route('/tif').post(upload.single('file'), async (req, res, next) => {
  // SEED Properties
  var social = req.body.social || true;
  var economic = req.body.economic || true;
  var environmental = req.body.environmental || true;
  var demographic = req.body.demographic || true;
  var mapName = req.body.mapName || filename;

  var dataType = req.body.dataType || extension;

  var keywords = stringToArray(req.body.keywords) || [];
  var description = req.body.description || "No description provided";
  var language = req.body.language || "No language provided";
  var license = req.body.license || "No license provided";
  var doi = req.body.doi || "No DOI provided";
  var attribution = req.body.attribution || "No attribution provided";
  var regions = req.body.regions || "No regions provided";
  var dqs = req.body.dqs || "No Data Quality Statement provided";
  var restrictions = req.body.restrictions || "No restrictions provided";
  var constraints = req.body.constraints || "No constraints provided";
  var details = req.body.details || "";

  // check how many items are in the metadata collection, also in preparation for metadataID generation
  var generatedID = await Metadata.estimatedDocumentCount({}, function(err, result) {
    if (err) {
    } else {
      generatedID = "MTD"+pad(result+1, 3) // generate a metadataID
      var newMetadata = new Metadata({
        "name": mapName,
        "id": generatedID,
        "type": dataType,
        "social": social,
        "economic": economic,
        "environmental": environmental,
        "demographic": demographic,
        "upload_date": dateFormat(new Date().toLocaleString('en-US', { timeZone: 'Asia/Brunei' }), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        "properties": {
          "keywords": keywords,
          "description": description,
          "language": language,
          "license": license,
          "doi": doi,
          "attribution": attribution,
          "regions": regions,
          "dqs": dqs,
          "restrictions": restrictions,
          "constraints": constraints,
          "details": details,
        }
      });        
      // save in metadata collection
      newMetadata.save();
      return(generatedID);
    }
  });
  generatedID = "MTD"+pad(generatedID+1, 3);
  // check for existing images
  Image.findOne({ caption: req.body.caption }).then((image) => {// check how many items are in the metadata collection, also in preparation for metadataID generation
    var generatedID = Metadata.estimatedDocumentCount({}, function(err, result) {
      if (err) {
      } else {
        generatedID = "MTD"+pad(result+1, 3) // generate a metadataID
        var newMetadata = new Metadata({
          "name": mapName,
          "id": generatedID,
          "type": dataType,
          "social": social,
          "economic": economic,
          "environmental": environmental,
          "demographic": demographic,
          "upload_date": dateFormat(new Date().toLocaleString('en-US', { timeZone: 'Asia/Brunei' }), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
          "properties": {
            "keywords": keywords,
            "description": description,
            "language": language,
            "license": license,
            "doi": doi,
            "attribution": attribution,
            "regions": regions,
            "dqs": dqs,
            "restrictions": restrictions,
            "constraints": constraints,
            "details": details,
          }
        });

        // save in metadata collection
        newMetadata.save();
        return(generatedID);
      }
    });
    generatedID = "MTD"+pad(generatedID+1, 3);
    if (image) {
      return res.status(200).json({
        success: false,
        message: 'Image already exists',
      });
    }
    let newImage = new Image({
      caption: 'test',
      filename: 'file',
      fileId: 'file',
    });
    newImage.save().then((image) => {
      res.status(200).json({
        success: true,
        image,
      });
    }).catch(err => res.status(500).json(err));
  }).catch(err => res.status(500).json(err));
});

module.exports = router;