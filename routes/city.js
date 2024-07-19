var router = require('express').Router();
let City = require('../models/city.model'); // access the model you are referring to

/* GET Citys listing. */
router.route('/').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/cities/",
                                      // eto yung ieexcute niya na function
  const query = req.body;
  City.find(query) // pwede ka maglagay ng query dito to further specify sorting methods
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes an item
router.route('/:id').delete((req, res) => {
  City.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds City to collection
router.route('/add').post((req, res) => {
  const checkID = {"properties.city_id": req.body.properties.city_id}; // check niya muna if may existing city na
                                              // with this ID, if meron, error siya
  var result = City.findOne(checkID, (err, result) => {
    if (result != null){ // may city na with that ID
        res.status(400).send();
    } else { // wala pang city with that ID, pwede tayo mag-add sa kanya

      const newItem = new City(req.body);

      newItem.save()
        .then(() => res.json('City added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      res.status(200);
    }
  });
});

module.exports = router;