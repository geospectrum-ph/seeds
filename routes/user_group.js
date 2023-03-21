var router = require('express').Router();
let UserGroup = require('../models/user_group.model'); // access the model you are referring to

/* GET User Privilege listing. */
router.route('/').get((req, res) => { 
  const query = req.body;
  UserGroup.find(query).populate({path: "privileges", model:"groupprivileges"})
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds User Group to collection
router.route('/add').post((req, res) => {
  const checkGroupTypeName = {"properties.user_group_type": req.body}; 
                                        
  var result = UserGroup.findOne(checkGroupTypeName, (err, result) => {
    if (result != null){ //
      res.status(400).send();
    } else {
      const newItem = new UserGroup(req.body);
      newItem.save()
        .then(() => res.json('UserGroup added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      res.status(200);
    }
  });
});
  
//UPDATE GROUP
router.route('/update/:id').put((req, res) => {
  UserGroup.findById(req.params.id).then(group => {
    group.user_group_type = req.body.user_group_type;
    group.privileges = req.body.privileges;
    group.save().then(() => res.json('Group updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
  })
});

//DELETE GROUP
router.route('/delete/:id').delete((req, res) => {
  UserGroup.findByIdAndDelete(req.params.id)
    .then(() => res.json('Group deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;