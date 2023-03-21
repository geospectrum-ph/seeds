var router = require('express').Router();
let Barangay = require('../models/barangay.model'); // access the model you are referring to

Barangay.collection.createIndex({ "geometry" : "2dsphere" });

// Source: https://stackoverflow.com/questions/27820794/how-to-use-geointersects-in-mongodb-properly
// Source: https://docs.mongodb.com/manual/reference/operator/query/geoIntersects/

// Ito ay para sa general na pagselect ng Shapes based sa intersection ng Shapes (geojson) at pointOrPolygon (geojson)
async function findShapesUsingPointOrPolygon(Shapes, pointOrPolygon){

  // shapes = target shape
  // pointOrPolygon = point or polygon used to geointersected with shape to query it

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
    return foundShapes2
  }
}

/* GET Barangays listing. */
router.route('/').get((req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/barangay/",
                                      // eto yung ieexcute niya na function
  var brgy_id = req.query.brgy_name || null;
  var query = {}
  console.log(brgy_id, req.query.brgy_name)
  if (brgy_id){
    query = {"properties.brgy_name": req.query.brgy_name};
  }

  Barangay.find(query) // pwede ka maglagay ng query dito to further specify sorting methods
    .then(items => {res.json(items)})
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes an item
router.route('/:id').delete((req, res) => {
  Barangay.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds Barangay to collection
router.route('/add').post((req, res) => {
  const checkID = {"properties.brgy_id": req.body.properties.brgy_id}; // check niya muna if may existing brgy na
                                              // with this ID, if meron, error siya
  var result = Barangay.findOne(checkID, (err, result) => {
    if (result != null){ // may brgy na with that ID
      res.status(400).send();
    } else { // wala pang brgy with that ID, pwede tayo mag-add sa kanya
      const newItem = new Barangay(req.body);
      newItem.save()
        .then(() => res.json('Barangay added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      res.status(200);
    }
  });
});

/* GET barangays listing. */
// Source: https://stackoverflow.com/questions/27820794/how-to-use-geointersects-in-mongodb-properly
router.route('/findBarangay').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/barangay/findBarangay",
                                      // eto yung ieexcute niya na function
  const pointOrPolygon = { 
    type: 'Point', 
    coordinates: [parseFloat(req.query.long), parseFloat(req.query.lat)] 
  }; // save as a point
  var selectedBrgy = await findShapesUsingPointOrPolygon(Barangay, pointOrPolygon); // hanapin yung selectedBrgy based sa Barangay na mag-iintersect sa pointOrPolygon
  res.json(selectedBrgy); // return selectedBrgy
});

module.exports = router;