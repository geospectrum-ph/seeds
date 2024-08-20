var router = require('express').Router();
let UserGroupPermission = require('../models/user_group_permission.model'); // access the model you are referring to

/* GET User Privilege listing. */
router.route('/').get((req, res) => { 
  const query = req.body;
  UserGroupPermission.find(query).then(items => res.json(items))
  .catch(err => res.status(400).json('Error: ' + err));
});

//adds User Group to collection
router.route('/add').post((req, res) => {
  const checkExisting = {"properties.user_id, properties.privileges[]": req.body};                                 

  var result = UserGroupPermission.findOne(checkExisting, (err, result) => {
    if (result != null){ //
      res.status(400).send();
    } else {
      const newItem = new UserGroupPermission(req.body);
      newItem.save()
        .then(() => res.json('UserGroupPermission added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      res.status(200);
    }
  });
});

module.exports = router;