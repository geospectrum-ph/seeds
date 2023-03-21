var router = require('express').Router();
const path = require('path');
const turf = require('@turf/turf');

// Data Models for Object Schemas
let Metadata = require('../models/metadata.model');
let Shapefile = require('../models/shapefile.model');
let Barangay = require('../models/barangay.model');
let Table = require('../models/table.model');
let Raster = require('../models/raster.model');

let Disease = require('../models/disease-models/disease.model');
let Disease_Barangay = require('../models/disease-models/disease.barangay.model');

let Employment_Points = require('../models/job-models/employment.point.model');
let Employment_Barangay = require('../models/job-models/employment.barangay.model');

let Commercial_Points = require('../models/commercial-models/commercial.point.model');
let Commercial_Barangay = require('../models/commercial-models/commercial.barangay.model');

let LandUse = require('../models/landuse.model');

let Household_Population = require('../models/household-models/household.population.js')
let Household_Shape = require('../models/household-models/household.shape.js')

let Style = require('../models/style.model');

const {convert} = require('geojson2shp');
const { parseAsync } = require('json2csv');

Shapefile.collection.createIndex({ "properties.mtd_id": "text" });
Table.collection.createIndex({ "properties.mtd_id": "text" });
Raster.collection.createIndex({ "properties.mtd_id": "text" });

const options = {
  layer: 'exported_shapefile',
  targetCrs: 4326
}

const getItems = async (Collection, queryMetadataID, res) => {
  await Collection.find(queryMetadataID) // pwede ka maglagay ng query dito to further specify sorting methods
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Shapefile Return Error: ' + err));
}

/* DOWNLOAD FILES */
router.route('/download').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/download?id=MTD001",
                                      // eto yung ieexcute niya na function
  const checkMetadataID = {id: req.query.id};
  const queryMetadataID = {"properties.mtd_id": req.query.id};

  var result = await Metadata.findOne(checkMetadataID, async (err, result) => {
    if (result == null){ // Metadata does not exist in Metadata Collection
      res.status(400).json("Data does not exist! Check Data Catalog.");
    } else { // May nakita na data siya sa Metadata Collection
      // TYPE 1: SHAPEFILE TYPE OF METADATA
      if (result.type == 'shp'){
        await Shapefile.find(queryMetadataID) // pwede ka maglagay ng query dito to further specify sorting methods
          .then(items => {
            var pathToExport = path.join(__dirname, '../public/uploads');
            convert(items, pathToExport, options);
            res.json("DONE EXPORT!");
          }).catch(err => res.status(400).json('Shapefile Return Error: ' + err));
          
      // TYPE 2: TABLE TYPE OF METADATA
      } else if (result.type == 'csv'){
        await Table.find(queryMetadataID) // pwede ka maglagay ng query dito to further specify sorting methods
          .then(items => {
            parseAsync(items)
              .then(csv => console.log(csv))
              .catch(err => console.error(err));
            res.json("DONE EXPORT!");
          }).catch(err => res.status(400).json('Table Return Error: ' + err));

      // TYPE 3: RASTER TYPE OF METADATA
      } else if (result.type == 'tif'){
        await Raster.find(queryMetadataID) // pwede ka maglagay ng query dito to further specify sorting methods
          .then(items => res.json(items))
          .catch(err => res.status(400).json('Raster Return Error: ' + err));
      // CATCH DATA TYPE ERROR
      } else {
        res.status(400).json("Metadata found in Data Catalogue but does not match allowed data types!");
      }
    }
  }).clone();
});

/* GET metadata listing. */
router.route('/').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const checkMetadataID = {id: req.query.id};
  const queryMetadataID = {"properties.mtd_id": req.query.id};

  var result = await Metadata.findOne(checkMetadataID, async (err, result) => {
    if (result == null){ // Metadata does not exist in Metadata Collection
      res.status(400).json("Data does not exist! Check Data Catalog.");
    } else { // May nakita na data siya sa Metadata Collection
      // TYPE 1: SHAPEFILE TYPE OF METADATA
      if (result.type == 'shp'){
        var keywords = result.properties.keywords; 

        if (keywords.includes('barangay') && keywords.includes('boundary')) {getItems(Barangay, queryMetadataID, res) }
        else if (keywords.includes('land use') && keywords.includes('boundary')) {getItems(LandUse, queryMetadataID, res) }
        else if (keywords.includes('household') && keywords.includes('boundary')) {getItems(Household_Shape, queryMetadataID, res) }

        else { getItems(Shapefile, queryMetadataID, res) }

      // TYPE 2: TABLE TYPE OF METADATA
      } else if (result.type == 'csv'){
        await Table.find(queryMetadataID) // pwede ka maglagay ng query dito to further specify sorting methods
          .then(items => res.json(items))
          .catch(err => res.status(400).json('Table Return Error: ' + err));

      // TYPE 3: RASTER TYPE OF METADATA
      } else if (result.type == 'tif'){
        await Raster.find(queryMetadataID) // pwede ka maglagay ng query dito to further specify sorting methods
          .then(items => res.json(items))
          .catch(err => res.status(400).json('Raster Return Error: ' + err));

      // CATCH DATA TYPE ERROR
      } else {
        res.status(400).json("Metadata found in Data Catalogue but does not match allowed data types!");
      }
    }
  }).clone();
});

/* GET barangays listing. */
router.route('/barangays').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/barangays",
                                      // eto yung ieexcute niya na function
  Barangay.find().then(items => {
    var data = {
      'count': items.length,
      'values': items.map(function (value) {
        var barangay = {
          "brgy_id": value.properties.brgy_id,
          "brgy_name": value.properties.brgy_name,
        }
        return barangay;
      }).sort((a,b) => (a.brgy_name > b.brgy_name) ? 1 : ((b.brgy_name > a.brgy_name) ? -1 : 0))
    };
    res.json(data);
  }).catch(err => res.status(400).json('Error: ' + err));
});

/* GET metadata listing. */
router.route('/disease').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const diseases = {
    "count":3,
    "values":["COVID-19","Dengue","Rabies"]
  };
  res.json(diseases).status(200)
});

/* GET metadata listing. */
router.route('/delete').post(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const checkMetadataID = {"id": req.body.id};
  const queryMetadataID = {"properties.mtd_id": req.body.id};

  const deleteCSVfromCollection = (model, query, idToDelete) => {
    model.deleteMany(query) // delete all objects with that metadata ID
      .then(Metadata.findByIdAndDelete(idToDelete, function (err) {
        if(err) console.log(err);
      })).then(Style.deleteMany({metadataID: req.body.id}))
      .then(res.json("Data has been deleted."))
      .catch(err => res.status(400).json('Table Return Error: ' + err));
  };

  const deleteShapefilefromCollection = (model, query, idToDelete) => {
    model.deleteMany(query) // delete all objects with that metadata ID
      .then(Metadata.findByIdAndDelete(idToDelete, function (err) {
        if(err) console.log(err);
      }))
      .then(Style.deleteMany({metadataID: req.body.id}))
      .then(res.json("Data has been deleted."))
      .catch(err => res.status(400).json('Table Return Error: ' + err));
  };

  var result = await Metadata.findOne(checkMetadataID, (err, result) => {
    if (result == null){ // Metadata does not exist in Metadata Collection
      res.status(400).json("Data does not exist! Check Data Catalog.");
    } else { // May nakita na data siya sa Metadata Collection
      var keywords = result.properties.keywords

      // TYPE 1: SHAPEFILE TYPE OF METADATA
      if (result.type == 'shp'){
        if (keywords.includes('land use') && keywords.includes('boundary')) deleteShapefilefromCollection(LandUse, queryMetadataID, result._id)
        else if (keywords.includes('household') && keywords.includes('boundary')) deleteShapefilefromCollection(Household_Shape, queryMetadataID, result._id)
        else if (keywords.includes('barangay') && keywords.includes('boundary')) deleteShapefilefromCollection(Barangay, queryMetadataID, result._id)
        else {
          Shapefile.deleteMany(queryMetadataID) // delete all objects with that metadata ID
            .then(Metadata.findByIdAndDelete(result._id, function (err) {
              if(err) console.log(err);
              console.log("Successful metadata deletion");
            })).then(Style.deleteMany({metadataID: req.body.id}, function (err) {
              if(err) console.log(err);
              console.log("Successful style deletion");
            })).then(res.json("Data has been deleted."))
            .catch(err => res.status(400).json('Shapefile Return Error: ' + err));
        }

      // TYPE 2: TABLE TYPE OF METADATA
      } else if (result.type == 'csv'){
        if (keywords.includes('disease') && keywords.includes('barangay')) deleteCSVfromCollection(Disease_Barangay, {"mtd_id": req.body.id}, result._id)
        else if (keywords.includes('disease') && keywords.includes('points')) deleteCSVfromCollection(Disease, queryMetadataID, result._id)
        else if (keywords.includes('employment') && keywords.includes('barangay')) deleteCSVfromCollection(Employment_Barangay, {"mtd_id": req.body.id}, result._id)
        else if (keywords.includes('employment') && keywords.includes('points')) deleteCSVfromCollection(Employment_Points, queryMetadataID, result._id)
        else if (keywords.includes('commercial') && keywords.includes('barangay')) deleteCSVfromCollection(Commercial_Barangay, {"mtd_id": req.body.id}, result._id)
        else if (keywords.includes('commercial') && keywords.includes('points')) deleteCSVfromCollection(Commercial_Points, queryMetadataID, result._id)
        else if (keywords.includes('household') && keywords.includes('points')) deleteCSVfromCollection(Household_Population, {"mtd_id": req.body.id}, result._id)
        else {
          deleteCSVfromCollection(Table, queryMetadataID, result._id)
        }
      // TYPE 3: RASTER TYPE OF METADATA
      } else if (result.type == 'tif'){
        Raster.deleteMany(queryMetadataID) // delete all objects with that metadata ID
          .then(Metadata.findByIdAndDelete(result._id, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          }))
          .then(res.json("Data has been deleted."))
          .catch(err => res.status(400).json('Raster Return Error: ' + err));

      // CATCH DATA TYPE ERROR
      } else {
        res.status(400).json("Metadata found in Data Catalogue but does not match allowed data types!");
      }
    }
  }).clone();
});

/* GET SLD Legend. */
router.route('/sld').get((req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/sld",
                                      // eto yung ieexcute niya na function
  const query = {metadataID: req.query.metadataID};

  Style.findOne(query) // pwede ka maglagay ng query dito to further specify sorting methods
    .then((items) => {
      var defaultStyle = {"style":[{
        "name":"default",
        "title":"default",
        "color":"#000000",
        "weight":"1",
        "strokeOpacity":null,
        "fillOpacity":null,
        "fillColor":"#ff0000",
        "dashArray":null,
        "lineJoin":"bevel",
        "lineCap":null}],
        "metadataID":req.query.metadataID
      }

      if (items) {res.status(200).json(items)} else {res.status(200).json(defaultStyle)}
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

/* GET barangays listing. */
router.route('/turf/intersect').post(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  var poly1 = turf.polygon(req.body.poly1.geometry.coordinates)
  var poly2 = turf.polygon(req.body.poly2.geometry.coordinates)
  var intersection = turf.intersect(poly1, poly2);

  res.json(intersection);
});

router.route('/bounds').get((req, res) => {
  Barangay.find({"properties.NAME_2": "Mandaluyong", "geometry.type": "Polygon"})
    .then(items => res.json(items))
    .catch(err => console.log(err))
})
// Coming next: downloading of Files - use https://www.npmjs.com/package/geojson2shp and https://www.npmjs.com/package/json2csv

module.exports = router