var router = require('express').Router();
let Shapefile = require('../models/shapefile.model');
let Table = require('../models/table.model');
let Raster = require('../models/raster.model');
let Barangay = require('../models/barangay.model');
let Commercial_Points = require('../models/commercial-models/commercial.point.model');
let Commercial_Barangay = require('../models/commercial-models/commercial.barangay.model');

Shapefile.collection.createIndex({ "properties.mtd_id": "text" });
Table.collection.createIndex({ "properties.mtd_id": "text" });
Raster.collection.createIndex({ "properties.mtd_id": "text" });

/* GET barangays listing. */
router.route('/brgy/single').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const startdate = req.query.startdate || await getMin(Commercial_Barangay, "date");
  const enddate = req.query.enddate || await getMax(Commercial_Barangay, "date");
  const com_classes = req.query.com_class || await getClasses(Commercial_Barangay, "class") // Note: for the generic model, the default will be derived from the generic.properties.mapping.barangay.js with same subdomain under

  var shape = await Barangay.findOne({"properties.brgy_id": req.query.brgy_id})
  var properties = []

  console.log(shape)

  var bar = new Promise((resolve, reject) => {
    com_classes.forEach(async (com_class) => {

      const query = {
        "brgy_id": req.query.brgy_id,
        "date": { $gte: startdate, $lte: enddate },
        "class": com_class 
      };

      await Commercial_Barangay.find(query).then((items) => {
        var newItem = {
          'dateUpdated': enddate,
          'class': com_class,
          'institution_count': "N/A",
          'capitalization_total': "N/A",
          'employees_total': "N/A",
        }
        if (items.length !== 0){
          let item = items.sort((a,b) => (parseInt(a.date) > parseInt(b.date)) ? 1 : ((parseInt(b.date) > parseInt(a.date)) ? -1 : 0))[items.length - 1]
          newItem = {
            'dateUpdated': item.date,
            'class': com_class,
            'institution_count': item.institution_count,
            'capitalization_total': item.capitalization_total,
            'employees_total': item.employees_total,
          }
        }
        if(properties.includes(newItem)){} // do nothing if already contains that item to avoid duplicates
        else(properties.push(newItem)) // push newItem to properties

        if (properties.length === com_classes.length){
          properties.sort((a,b) => ((a.class) > (b.class)) ? 1 : (((b.class) > (a.class)) ? -1 : 0))
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
router.route('/graph').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const startdate = req.query.startdate || await getMin(Commercial_Barangay, "date");
  const enddate = req.query.enddate || await getMax(Commercial_Barangay, "date");
  const com_classes = req.query.com_class || await getClasses(Commercial_Barangay, "class") // Note: for the generic model, the default will be derived from the generic.properties.mapping.barangay.js with same subdomain under

  var properties = []

  var bar = new Promise((resolve, reject) => {
    com_classes.forEach(async (com_class) => {
      const query = {
        "brgy_id": req.query.brgy_id,
        "date": { $gte: startdate, $lte: enddate },
        "class": com_class 
      };
      await Commercial_Barangay.find(query).then((items) => {
        var newItem = {
          'dateUpdated': enddate,
          'class': com_class,
          'institution_count': "N/A",
          'capitalization_total': "N/A",
          'employees_total': "N/A",
        }
        if (items.length !== 0){
          let item = items.sort((a,b) => (parseInt(a.date) > parseInt(b.date)) ? 1 : ((parseInt(b.date) > parseInt(a.date)) ? -1 : 0))[items.length - 1]
          newItem = {
            'dateUpdated': item.date,
            'class': com_class,
            'institution_count': item.institution_count,
            'capitalization_total': item.capitalization_total,
            'employees_total': item.employees_total,
          }
        }
        if(properties.includes(newItem)){} // do nothing if already contains that item to avoid duplicates
        else(properties.push(newItem)) // push newItem to properties

        if (properties.length === com_classes.length){
          properties.sort((a,b) => ((a.class) > (b.class)) ? 1 : (((b.class) > (a.class)) ? -1 : 0))
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
router.route('/brgy/all').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const startdate = req.query.startdate || await getMin(Commercial_Barangay, "date");
  const enddate = req.query.enddate || await getMax(Commercial_Barangay, "date");
  const com_classes = req.query.com_class || await getClasses(Commercial_Barangay, "class") // Note: for the generic model, the default will be derived from the generic.properties.mapping.barangay.js with same subdomain under

  Barangay.find().then(async barangays => {
    var values = await Promise.all(barangays.map(async function (value) {
      var com_classes2 = req.query.com_class || await getClasses(Commercial_Barangay, "class") // copy 2 so that it returns "0" if there's no type (e.g. has food and energy but no transport)
      var items = await Commercial_Barangay.find({
        "brgy_id": value.properties.brgy_id,
        "date": { $gte: startdate, $lte: enddate },
        "class": { $in: com_classes }
      }); // $or / $in operator: https://docs.mongodb.com/manual/reference/operator/query/or/#op._S_or}
      if(items.length !== 0){
        var barangay = {
          'type': 'Feature',
          'properties': {
            'brgy_id': value.properties.brgy_id,
            'brgy_name': value.properties.brgy_name,
          },
        }
        // Remove duplicate entries
        items = arrUnique(items)
        
        items.map( function (value2) { // Map each entry for each item in commercial_brgy
          barangay.properties[value2.class] = value2.institution_count; // {..., "Food": 8, ....}
          // Remove value2.class from com_classes2
          // Source: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
          com_classes2 = com_classes2.filter(item => item !== value2.class) // the remaining com_classes2 will be inserted as 0 values
        })
        for (var i = 0; i < com_classes2.length; i++) {
          barangay.properties[com_classes2[i]] = 0;
        }
      return barangay
      } else {

      }

    }))
    values = values.filter(Boolean);
    var data = {
      'count': barangays.length,
      'values': values.sort((a,b) => (a.properties.brgy_name > b.properties.brgy_name) ? 1 : ((b.properties.brgy_name > a.properties.brgy_name) ? -1 : 0))
    };
    res.json(data);
  }).catch(err => res.status(400).json('Error: ' + err));
});

/* GET barangays listing. */
router.route('/allpoints').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  Commercial_Points.find()
  .then(items => res.json(items))
  .catch(err => res.status(400).json('Error: ' + err));
});

/* GET barangays listing. */
router.route('/single/points').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/?id=MTD001",
                                      // eto yung ieexcute niya na function
  const query = {
    "properties.brgy_id": req.query.brgy_id,
    "properties.date": { $gte: req.query.startdate, $lte: req.query.enddate }
  };

  Commercial_Points.find(query)
  .then(items => res.json(items))
  .catch(err => res.status(400).json('Error: ' + err));
});


/* GET commercial types. */
async function getClasses(collection, key){
  // eto yung ieexcute niya na function
  var query = key || "class"
  var collection = collection || Commercial_Barangay
  var output = null

  await collection.distinct(query)
    .then(items => {output = items})
    .catch(err => {});
  
  return output
};

async function getMax(collection, key){
  // eto yung ieexcute niya na function
  this.query = key || "date"
  var collection = collection || Commercial_Barangay
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
  var collection = collection || Commercial_Barangay
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

// Remove duplicate objects from an array Source: https://stackoverflow.com/questions/23507853/remove-duplicate-objects-from-json-array
function arrUnique(arr) {
  var cleaned = [];
  arr.forEach(function(itm) {
    var unique = true;
    cleaned.forEach(function(itm2) {
      // if (_.isEqual(itm, itm2)) unique = false;
      if (itm === itm2) unique = false;
    });
    if (unique)  cleaned.push(itm);
  });
  return cleaned;
}

module.exports = router