var router = require('express').Router();
let Household = require('../../models/mobile-models/household-new.models')

//add new data
router.route('/add').post((req, res) => {
  // console.log(req.body)
  var new_info = new Household(req.body)

  new_info.save()
    .then(() => {res.send("saved!")})
    .catch(err => res.status(400).json('Error: ' + err));
})

//edit data
router.route('/edit').post((req, res) => {
  Household.findOneAndUpdate({householdNo: req.body.householdNo}, req.body.update, {
    new: true
  }).then(() => {res.send("updated!")})
    .catch(err => res.status(400).json('Error: ' + err));
})

//
router.route('/getOne').get((req, res) => {
  Household.findOne({householdNo: req.body.householdNo}, function(err, info){
    if (err){
      return res.status(400).send({
        message: err
      })
    }
    return res.status(201).send(info)
  })
})

module.exports = router