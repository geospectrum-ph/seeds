// WALA PANG INAYOS DITO 
// COPY PASTED ONLY FROM HEALTH MAPPER
// FOR JIM

var router = require('express').Router();
let Shapefile = require('../models/shapefile.model');
let Table = require('../models/table.model');
let Raster = require('../models/raster.model');
let Barangay = require('../models/barangay.model');
let Employment_Points = require('../models/job-models/employment.point.model');
let Employment_Barangay = require('../models/job-models/employment.barangay.model');

Shapefile.collection.createIndex({ "properties.mtd_id": "text" });
Table.collection.createIndex({ "properties.mtd_id": "text" });
Raster.collection.createIndex({ "properties.mtd_id": "text" });

/* GET barangays listing. */
router.route('/brgy/single').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/jobmapper/brgy/single",
                                      // eto yung ieexcute niya na function (for mapping, and pie chart)
  const startdate = req.query.startdate || await getMin();
  const enddate = req.query.enddate || await getMax();
  const job_classes = req.query.job_class || await getClasses();

  var shape = await Barangay.findOne({"properties.brgy_id": req.query.brgy_id})
  var properties = []

  var bar = new Promise((resolve, reject) => {
    job_classes.forEach(async (job_class) => {
      const query = {
        "brgy_id": req.query.brgy_id,
        "date": { $gte: startdate, $lte: enddate },
        "job_class": job_class 
      };

      await Employment_Barangay.find(query).then((items) => {
        var newItem = {
          'dateUpdated': enddate,
          'job_class': job_class,
          'female': "N/A",
          'total': "N/A",
          'male': "N/A"
        }
        if (items.length !== 0){
          let item = items.sort((a,b) => (parseInt(a.date) > parseInt(b.date)) ? 1 : ((parseInt(b.date) > parseInt(a.date)) ? -1 : 0))[items.length - 1]
          newItem = {
            'dateUpdated': item.date,
            'job_class': job_class,
            'female': item.female,
            'total': item.total,
            'male': item.male
          }
        }
        properties.push(newItem)

        if (properties.length === job_classes.length) {
          properties.sort((a,b) => ((a.job_class) > (b.job_class)) ? 1 : (((b.job_class) > (a.job_class)) ? -1 : 0))
          resolve();
        }
      })
    })
  });

  bar.then(() => {
    var data = {
      'type': 'Feature',
      'properties': properties,
      'geometry': shape.geometry
    }
    res.json(data);
  })
});

/* GET barangays listing. */
router.route('/graph').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/jobmapper/graph",
                                      // eto yung ieexcute niya na function (for bar graph)
  const startdate = req.query.startdate || await getMin();
  const enddate = req.query.enddate || await getMax();
  const job_classes = req.query.job_class || await getClasses();
  var properties = []

  var bar = new Promise((resolve, reject) => {
    job_classes.forEach(async (job_class) => {

      const query = {
        "brgy_id": req.query.brgy_id,
        "date": { $gte: startdate, $lte: enddate },
        "job_class": job_class 
      };
      await Employment_Barangay.find(query).then((items) => {
        var newItem = {
          'dateUpdated': enddate,
          'job_class': job_class,
          'female': "N/A",
          'total': "N/A",
          'male': "N/A"
        }
        if (items.length !== 0){
          let item = items.sort((a,b) => (parseInt(a.date) > parseInt(b.date)) ? 1 : ((parseInt(b.date) > parseInt(a.date)) ? -1 : 0))[items.length - 1]
          newItem = {
            'dateUpdated': item.date,
            'job_class': job_class,
            'female': item.female,
            'total': item.total,
            'male': item.male
          }
        }
        properties.push(newItem)

        if (properties.length === job_classes.length) {
          properties.sort((a,b) => ((a.job_class) > (b.job_class)) ? 1 : (((b.job_class) > (a.job_class)) ? -1 : 0))
          resolve();
        }
      })
    })
  });
  bar.then(() => {
    var data = {
      "count": properties.length,
      "values": properties
    }
    res.json(data);
  })

});

/* GET barangays listing. */
router.route('/brgy/all').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/jobmapper/brgy/all",
                                      // eto yung ieexcute niya na function (for table)
  const startdate = req.query.startdate || await getMin();
  const enddate = req.query.enddate || await getMax();
  const job_class = req.query.job_class || await getClasses();
  Barangay.find().then(async barangays => { // for each barangay boundary shapefile
    var values = await Promise.all(barangays.map(async function (value) {
      var items = await Employment_Barangay.find({
        "brgy_id": value.properties.brgy_id,
        "date": { $gte: startdate, $lte: enddate },
        "job_class": { $in: job_class }
      }); // $or / $in operator: https://docs.mongodb.com/manual/reference/operator/query/or/#op._S_or}

      if(items.length !== 0){
        var barangay = {
          'type': 'Feature',
          'properties': {
            'brgy_id': value.properties.brgy_id,
            'brgy_name': value.properties.brgy_name,
          }
        }
        items.map( function (value2) { // Map each entry for each item in employment_brgy
          barangay.properties[value2.job_class] = value2.total;
        })
      } else {
        var barangay = {
          'type': 'Feature',
          'properties': {
            'brgy_id': "N/A",
            'brgy_name': "N/A",
            'dateUpdated': "N/A",
            'job_class': "N/A",
            'female': "N/A",
            'total': "N/A",
            'male': "N/A"
          }
        }
      }
      return barangay
    }))
    var data = {
      'count': barangays.length,
      'values': values.sort((a,b) => (a.properties.brgy_name > b.properties.brgy_name) ? 1 : ((b.properties.brgy_name > a.properties.brgy_name) ? -1 : 0))
    };
    res.json(data);
  }).catch(err => res.status(400).json('Error: ' + err));
});

/* GET barangays listing. */
router.route('/allpoints').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/jobmapper/allpoints",
                                      // eto yung ieexcute niya na function
  Employment_Points.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* GET barangays listing. */
router.route('/single/points').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/jobmapper/single/points,
                                      // eto yung ieexcute niya na function
  const query = {
    "properties.brgy_id": req.query.brgy_id,
    "properties.date": { $gte: req.query.startdate, $lte: req.query.enddate },
    "job_class": { $in: job_class }
  }; 

  Employment_Points.find(query)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* GET job types. */
async function getClasses(collection, key){
  // eto yung ieexcute niya na function
  var query = key || "job_class"
  var collection = collection || Employment_Barangay
  var output = null

  await collection.distinct(query)
    .then(items => {output = items})
    .catch(err => {});
  
  return output
};

async function getMax(collection, key){
  // eto yung ieexcute niya na function
  this.query = key || "date"
  var collection = collection || Employment_Barangay
  var output = null

  await collection.aggregate([{
    $group:{
      _id: null,
      maxDate: { $max: '$' + this.query }
    }
  }]).then(items => {
    output = items[0].maxDate
  }).catch(err => {})

  return output;
};

async function getMin(collection, key){
  // eto yung ieexcute niya na function
  this.query = key || "date"
  var collection = collection || Employment_Barangay
  var output = null

  await collection.aggregate([{
    $group:{
      _id: null,
      minDate: { $min: '$' + this.query },
    }
  }]).then(items => {
    output = items[0].minDate;
  }).catch(err => {})

  return output;
};

module.exports = router