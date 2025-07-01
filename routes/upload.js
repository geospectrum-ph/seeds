var router = require('express').Router();
const path = require('path');
// var gdal = require('gdal-async'); // Package used to read shapefiles

const fs = require("fs") // Package used for reading file directories
const decompress = require('decompress'); // Package used for decompressing ZIP file
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
let Table = require('../models/table.model');
let Image = require('../models/image.model');
let Style = require('../models/style.model');

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
const emptyDirectory = async () => {
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

function getColor(){ 
  return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)'
}

hex_color = getColor();

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
    emptyDirectory()
    // console.log('directory removed!')
  });
  res.status(200);
}

/* Function for uploading shapefiles. */
async function SHP_GeneralUpload(inputLayer, generatedID, sld_txt, response) {
  try {
    const objectified = JSON.parse(inputLayer);

    var bulk = Shapefile.collection.initializeOrderedBulkOp();

    Object.assign(objectified, {
      "properties": {
        ...objectified["properties"],
        "sld_txt": sld_txt,
        "mtd_id": generatedID,
      }
    });

    bulk.insert(objectified);

    await bulk
      .execute()
      .then(function () {
        emptyDirectory();
      })
      .catch(function (error) {
        emptyDirectory();
      });

    response
      .json("Shapefile uploaded!")
      .status(200); 
  }
  catch (error) {
    emptyDirectory();

    response
      .json("Upload failed!")
      .status(404);
  }
}

/* Route for uploading shapefiles. */
router
  .route("/shp")
  .post(
    localupload.single("file"),
    async function (request, response) {
      const file = request.file;
      const extension = extractExtension(file.originalname);

      let shp_name = null;
      let sld_name = null;

      if (extension !== "zip") {
        emptyDirectory();

        response
          .status(400)
          .send("Please upload the entire shapefile as a zipfile. Thank you!");
      }
      else {
        await decompress(file.path, file.destination).then(function (files) {
          try {
            shp_name = files.filter(item => item.path.endsWith(".shp"))[0].path;
          }
          catch (error) {
            response
              .status(400)
              .send("Please upload the entire shapefile as a zipfile. Thank you!");
          };

          try {
            sld_name = files.filter(item => item.path.endsWith(".sld"))[0].path;
          }
          catch (error) {
            sld_name = null;
          };

          fs.unlinkSync(file.path);
        });
      }

      const initGdalJs = require("gdal3.js/node");
      const gdal = await initGdalJs();

      async function getFile (path) {
        const opened = await gdal.open([path]); // https://gdal3.js.org/docs/module-f_open.html
        const options = [ // https://gdal.org/programs/ogr2ogr.html#description
          "-f", "GeoJSON",
          "-t_srs", "EPSG:4326",
        ];
        const converted = await gdal.ogr2ogr(opened.datasets[0], options, "output"); 
        const dataByte = await gdal.getFileBytes(converted);
        const output = Buffer.from(dataByte).toString("utf8");
        
        gdal.close(opened);
        
        return (output);
      }

      var inputLayer = await getFile(path.join(__dirname, "../", file.destination, shp_name));

      let sld_txt = "na";
      let sld_legend = [];

      if (sld_name != null) {
        sld_txt = fs.readFileSync(path.join(__dirname, "../", file.destination, sld_name)).toString();
        sld_legend = await sld2legend.sld2legend(sld_txt);
      }

      // SEEDs Properties
      
      var social = request.body.social || true;
      var economic = request.body.economic || true;
      var environmental = request.body.environmental || true;
      var demographic = request.body.demographic || true;

      var mapName = request.body.mapName || file.originalname;
      var dataType = request.body.dataType || extension;

      var keywords = stringToArray(request.body.keywords) || [];
      var description = request.body.description || "No description provided";
      var language = request.body.language || "No language provided";
      var license = request.body.license || "No license provided";
      var doi = request.body.doi || "No DOI provided";
      var attribution = request.body.attribution || "No attribution provided";
      var regions = request.body.regions || "No regions provided";
      var dqs = request.body.dqs || "No Data Quality Statement provided";
      var restrictions = request.body.restrictions || "No restrictions provided";
      var constraints = request.body.constraints || "No constraints provided";
      var details = request.body.details || "";
  
      var generatedID = await generateMetadataID();

      var newMetadata = new Metadata({ 
        "name": mapName,
        "id": generatedID,
        "type": dataType,
        "social": social,
        "economic": economic,
        "environmental": environmental,
        "demographic": demographic,
        "upload_date": dateFormat(new Date().toLocaleString("en-US", { timeZone: "Asia/Brunei" }), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
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

      var newStyle = new Style({
        "name": mapName,
        "metadataID": generatedID,
        "style": sld_legend,
        "text": sld_txt
      });

      newStyle.save();

      SHP_GeneralUpload(inputLayer, generatedID, sld_txt, response);
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


    CSV_General_Upload(result, generatedID, res)
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
