var router = require('express').Router();
const { db } = require('../models/building.model');
let Building = require('../models/building.model'); // access the model you are referring to

Building.collection.createIndex({ bldg_id: "text" });

/* GET Buildings listing. */
router.route('/').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/buildings/",
                                      // eto yung ieexcute niya na function
  const query = req.body;
  Building.find(query).limit(4000) // pwede ka maglagay ng query dito to further specify sorting methods
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* GET Buildings listing for rendering on viewport */
router.route('/viewport').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/buildings/viewport",
                                      // eto yung ieexcute niya na function
  const latitude = req.body.latitude;
  const longitude = req.body.latitude;

  const query = {
    geometry: {
      $near: {
        $maxDistance: parseInt(5000),
        $geometry: {
          type: 'Point',
          coordinates: [parseInt(longitude), parseInt(latitude)]
        }
      }
    }
  };

  Building.find(query).limit(4000) // pwede ka maglagay ng query dito to further specify sorting methods
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes an item
router.route('/:id').delete((req, res) => {
  Building.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
