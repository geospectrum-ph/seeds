var router = require('express').Router();
let UserPrivilege = require('../models/group_privilege.model'); // access the model you are referring to

/* GET User Privilege listing. */
router.route('/').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/cities/",
    // eto yung ieexcute niya na function
  const query = req.body;
  UserPrivilege.find(query) // pwede ka maglagay ng query dito to further specify sorting methods
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds Privilege to collection
router.route('/add').post((req, res) => {
  const checkPrivilegeName = {"properties.privilege_name": req.body};                                  

  var result = UserPrivilege.findOne(checkPrivilegeName, (err, result) => {
    if (result != null){ //
      res.status(400).send();
    } else {
      const newItem = new UserPrivilege(req.body);
      newItem.save()
        .then(() => res.json('Group Privilege added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      res.status(200);
    }
  });
});

module.exports = router;