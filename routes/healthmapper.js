var router = require('express').Router();
let Shapefile = require('../models/shapefile.model');
let Table = require('../models/table.model');
let Raster = require('../models/raster.model');
let Barangay = require('../models/barangay.model');
let Disease = require('../models/disease-models/disease.model');
let Disease_Barangay = require('../models/disease-models/disease.barangay.model');

Shapefile.collection.createIndex({ "properties.mtd_id": "text" });
Table.collection.createIndex({ "properties.mtd_id": "text" });
Raster.collection.createIndex({ "properties.mtd_id": "text" });

const formatDate = (date) => { // yyyymmdd => yyyy/mm/dd
  var newDate = date.slice(0,4) + "/" + date.slice(4,6) + "/" + date.slice(6,8)
  return newDate
}

/* GET barangays listing. */
router.route('/brgy/single').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const count = await Disease.collection.estimatedDocumentCount();

  if ( count > 0) {
    const startdate = req.query.startdate || await getMin(Disease, "properties.date");
    const enddate = req.query.enddate || await getMax(Disease, "properties.date");
    const disease = req.query.disease || await getClasses(Disease, "properties.disease");
    const query = {
      "properties.brgy_id": req.query.brgy_id,
      "properties.date": { $gte: startdate, $lte: enddate },
      "properties.disease": { $in: disease}
    };
    
    Disease.find(query).then(async (items) => {
      var recovered = items.filter(function (item) {
        return item.properties.status == 'Recovered'
      });
      var death = items.filter(function (item) {
        return item.properties.status == 'Deceased'
      });
      var shape = await Barangay.findOne({"properties.brgy_id": req.query.brgy_id})
      var data = {
        'type': 'Feature',
        'properties': {
          'dateUpdated': req.query.enddate,
          'active': items.length-death.length-recovered.length,
          'total': items.length,
          'death': death.length,
          'recovered': recovered.length
        }, 'geometry': shape.geometry
      }
      res.json(data);
    }).catch(err => res.status(400).json('Error: ' + err));
  } else {
    const startdate = req.query.startdate || await getMin(Disease_Barangay, "date");
    const enddate = req.query.enddate || await getMax(Disease_Barangay, "date");
    const disease = req.query.disease || await getClasses(Disease_Barangay, "disease");
    const query = {
      "brgy_id": req.query.brgy_id,
      "date": { $gte: startdate, $lte: enddate },
      "disease": { $in: disease }
    };

    Disease_Barangay.find(query).then(async (items) => {
      if (items.length == 0){ // if the data is nonexistent
        var total = 'N/A';
        var recovered = 'N/A';
        var death = 'N/A';
        var active = 'N/A';
        var date = 'N/A'
      } else {
        var total = items.reduce(function(prev, cur) {
          return prev + cur.new_active;
        }, 0)

        var recovered = items.reduce(function(prev, cur) {
          return prev + cur.new_recovered;
        }, 0)

        var death = items.reduce(function(prev, cur) {
          return prev + cur.new_death;
        }, 0)

        var active = total - recovered - death

        var date = enddate
      }
      var shape = await Barangay.findOne({"properties.brgy_id": req.query.brgy_id})
      var data = {
        'type': 'Feature',
        'properties': {
          'dateUpdated': date,
          'active': active,
          'total': total,
          'death': death,
          'recovered': recovered
        }, 'geometry': shape.geometry
      }
      res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

/* GET barangays listing. */
router.route('/graph').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const count = await Disease.collection.estimatedDocumentCount();

  if ( count > 0) {
    const disease = req.query.disease || await getClasses(Disease, "properties.disease");
    const query = {
      "properties.brgy_id": req.query.brgy_id,
      // "properties.date":  { $gte: startdate, $lte: enddate }
      "properties.disease": { $in: disease }
    };
    Disease.find(query).then(items => {
      if (items.length != 0){ // if the data is existing
        var data = {
          'count': items.length,
          'values': []
        }
        var distinctDates = [...new Set(items.map(x => x.properties.date))] // get distinct dates; Source: https://codeburst.io/javascript-array-distinct-5edc93501dc4
        distinctDates.forEach((distinctDate) =>{
          var active = items.filter(function (item) {
            return item.properties.status == 'Active' && item.properties.date == distinctDate
          });
          var recovered = items.filter(function (item) {
            return item.properties.status == 'Recovered' && item.properties.date == distinctDate
          });
          var death = items.filter(function (item) {
            return item.properties.status == 'Deceased' && item.properties.date == distinctDate
          });
          var value = {
            'date': distinctDate,
            'date_label': formatDate(distinctDate),
            'active': active.length,
            'recovered': recovered.length,
            'death': death.length
          }
          data.values.push(value)
        })
      } else {
        var data = {
          'count': 'N/A',
          'values': [{
            'date': 'N/A',
            'date_label': 'N/A',
            'active': 'N/A',
            'recovered': 'N/A',
            'death': 'N/A'
          }]
        }
      }    
      data.values.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
      res.json(data);
    }).catch(err => res.status(400).json('Error: ' + err));
  } else {
    const disease = req.query.disease || await getClasses(Disease_Barangay, "disease");
    const query = {
      "brgy_id": req.query.brgy_id,
      "disease": { $in: disease }
      // "date":  { $gte: startdate, $lte: enddate }
    };

    Disease_Barangay.find(query).then(items => {
      if (items.length != 0){ // if the data is existing
        var data = {
          'count': items.length,
          'values': items.map(function (value) {
            var barangay = {
              'date': value.date,
              'date_label': formatDate(value.date),
              'active': value.new_active,
              'recovered': value.new_recovered,
              'death': value.new_death
            }
            return barangay;
          })
        }
      } else {
        var data = {
          'count': 'N/A',
          'values': [{
            'date': 'N/A',
            'date_label': 'N/A',
            'active': 'N/A',
            'recovered': 'N/A',
            'death': 'N/A'
          }]
        }
      }
      data.values.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
      res.json(data);
    }).catch(err => res.status(400).json('Error: ' + err));
  }
});

/* GET barangays listing. */
router.route('/brgy/all').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const count = await Disease.collection.estimatedDocumentCount();

  if ( count > 0) {
    Barangay.find().then(async barangays => {
      var values = await Promise.all(barangays.map(async function (value) {
        const startdate = req.query.startdate || await getMin(Disease, "properties.date");
        const enddate = req.query.enddate || await getMax(Disease, "properties.date");

        var items = await Disease.find({
          "properties.brgy_id": value.properties.brgy_id,
          "properties.date": { $gte: startdate, $lte: enddate }
        })
        var recovered = items.filter(function (item) {
          return item.properties.status == 'Recovered'
        });
        var death = items.filter(function (item) {
          return item.properties.status == 'Deceased'
        });

        var barangay = {
          'type': 'Feature', 
          'properties': {
            "brgy_id": value.properties.brgy_id,
            "brgy_name": value.properties.brgy_name,
            'active': items.length-death.length-recovered.length,
            'total': items.length,
            'death': death.length,
            'recovered': recovered.length,
            "dateUpdated": enddate
          }
        }
        return barangay;
      }))
      var data = {
        'count': barangays.length,
        'values': values.sort((a,b) => (a.properties.brgy_name > b.properties.brgy_name) ? 1 : 
          ((b.properties.brgy_name > a.properties.brgy_name) ? -1 : 0))
      };
      res.json(data);
    }).catch(err => res.status(400).json('Error: ' + err));
  } else {
    Barangay.find().then(async barangays => {
      var values = await Promise.all(barangays.map(async function (value) {
        const startdate = req.query.startdate || await getMin(Disease_Barangay, "date");
        const enddate = req.query.enddate || await getMax(Disease_Barangay, "date");
        var items = await Disease_Barangay.find({
          "brgy_id": value.properties.brgy_id,
          "date": { $gte: startdate, $lte: enddate }
        })
        if (items.length == 0){ // if the data is nonexistent
          var total = 'N/A';
          var recovered = 'N/A';
          var death = 'N/A';
          var active = 'N/A';
          var date = 'N/A';
        } else {
          var total = items.reduce(function(prev, cur) {
            return prev + cur.new_active;
          }, 0)
          var recovered = items.reduce(function(prev, cur) {
            return prev + cur.new_recovered;
          }, 0)
          var death = items.reduce(function(prev, cur) {
            return prev + cur.new_death;
          }, 0)
          var active = total - recovered - death
          var date = enddate
        }
        var barangay = {
          'type': 'Feature',
          'properties': {
            "brgy_id": value.properties.brgy_id,
            "brgy_name": value.properties.brgy_name,
            'active': active,
            'total': total,
            'death': death,
            'recovered': recovered,
            "dateUpdated": date
          }
        }
        return barangay;
      }))
      var data = {
        'count': barangays.length,
        'values': values.sort((a,b) => (a.properties.brgy_name > b.properties.brgy_name) ? 1 : ((b.properties.brgy_name > a.properties.brgy_name) ? -1 : 0))
      };
      res.json(data);
    }).catch(err => res.status(400).json('Error: ' + err));
  }
});

/* GET barangays listing. */
router.route('/allpoints').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  Disease.find({"properties.status": "Active"})
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* GET disease types. */
async function getClasses(collection, key){
  // eto yung ieexcute niya na function
  var query = key || "disease"
  var collection = collection // || Disease_Barangay
  var output = null

  await collection.distinct(query)
    .then(items => {output = items})
    .catch(err => {});
  
  return output
};

async function getMax(collection, key){
  // eto yung ieexcute niya na function
  this.query = key || "date"
  var collection = collection // // || Disease_Barangay
  var output = null

  await collection.aggregate([{
    $group: {
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
  var collection = collection // || Disease_Barangay
  var output = null

  await collection.aggregate([{
    $group: {
      _id: null,
      minDate: { $min: '$' + this.query },
    }
  }]).then(items => {
    output = items[0].minDate;
  }).catch(err => {})

  return output;
};

module.exports = router;