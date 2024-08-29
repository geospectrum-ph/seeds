var router = require('express').Router();
let Shapefile = require('../models/shapefile.model');
let Table = require('../models/table.model');
let Raster = require('../models/raster.model');
let Barangay = require('../models/barangay.model');
let Style = require('../models/style.model');
let LandUse = require('../models/landuse.model');

const turf = require('@turf/turf');

Shapefile.collection.createIndex({ "properties.mtd_id": "text" });
Table.collection.createIndex({ "properties.mtd_id": "text" });
Raster.collection.createIndex({ "properties.mtd_id": "text" });

/* GET barangays listing. */
router.route('/brgy').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  LandUse.find().then(async (items) => {
    var barangay = await Barangay.findOne({"properties.brgy_id": req.query.brgy_id})
    var barangay_area = turf.area(barangay)
    var mtd_id = items[0].properties.mtd_id;
    var style = await Style.findOne({"metadataID": mtd_id})
    var data = {
      'count': 0,
      'values': []
    }

    items.forEach((Landuse) => {
      var area = 0;
      var intersection = turf.intersect(barangay, Landuse);
      if (intersection != null) {
        area = turf.area(intersection)
        intersection.properties.area = Math.round(area * 100) / 100;
        intersection.properties.percent = Math.round(area*100/barangay_area);
        intersection.properties.Landuse = Landuse.properties.Landuse;
        intersection.properties.sld_txt = style.text;
        data.count += 1;
        data.values.push(intersection);
      }
    });
    res.json(data);
  }).catch(err => res.status(400).json('Error: ' + err));
});

/* GET barangays listing. */
router.route('/brgy/all').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/getdata/?id=MTD001",
                                                // eto yung ieexcute niya na function
  var Landuses = await LandUse.find();
  Barangay.find().then(async (items) => {

    var data = {
      'count': 0,
      'values': []
    }
    items.forEach((barangay) => {
      var barangayObject = {
        "id":barangay.properties.brgy_id,
        "brgy_name":barangay.properties.brgy_name
      }
      Landuses.forEach((Landuse) => {
        var area = 0;
        var intersection = turf.intersect(barangay, Landuse);
        if (intersection != null) {
          area = turf.area(intersection)
        }
        barangayObject[Landuse.properties.Landuse] = Math.round(area * 100) / 100
      });
      data.count += 1;
      data.values.push(barangayObject);
    });
  res.json(data);
  }).catch(err => res.status(400).json('Error: ' + err));
});

/* GET barangays listing. */
router.route('/graph').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  LandUse.find().then(async (items) => {
    var barangay = await Barangay.findOne({"properties.brgy_id": req.query.brgy_id})
    var barangay_area = turf.area(barangay)
    var data = [];

    items.forEach((Landuse) => {
      var area = 0;
      var intersection = turf.intersect(barangay, Landuse);
      if (intersection != null) {
        var objectToPush = {};
        area = turf.area(intersection)
        objectToPush.area = Math.round(area * 100) / 100;
        objectToPush.percent = Math.round(area*100/barangay_area);
        objectToPush.name = Landuse.properties.Landuse;
        data.push(objectToPush);
      }
    });
    res.json(data);
  }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router