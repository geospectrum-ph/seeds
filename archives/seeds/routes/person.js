var router = require('express').Router();
let Person = require('../models/person.model'); // access the Person model collection
let Building = require('../models/building.model'); // access the Building model collection
let Barangay = require('../models/barangay.model'); // access the Barangay model collection
let City = require('../models/city.model'); // access the City model collection

/* GET persons listing. */
router.route('/').get((req, res) => { 
  const query = req.body;
  Person.find(query)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes an item //NEW
router.route('/').delete( async (req, res) => {

  const checkPSN = {p_psn_number: req.body.p_psn_number}; // check niya muna if may existing tao na
                                                          // with this PSN, if meron, error siya
  var result = await Person.findOne(checkPSN, async (err, result) => {
    if (result == null){ // walang person na with that PSN
      res.status(400).send("Person is not in database");
    } else { // wala pang tao with that PSN, pwede tayo mag-add sa kanya
      // PHASE 1: Hanapin yung building, barangay at city ng person
      var building  = await Building.findOne({"properties.bldg_id": result.p_bldg_id});
      var barangay  = await Barangay.findOne({"properties.brgy_id": result.p_brgy_id}) ;
      var city  = await City.findOne({"properties.city_id": result.p_city_id});

      // PHASE 2: Update statistics per building, barangay, and city
      building.properties.bldg_no_resident -= 1;
      barangay.properties.brgy_no_resident -= 1;
      city.properties.city_no_resident -= 1;
      // lahat ng attributes dagdagan mo ng tig 1 based sa property
      // gender: M/F
      var p_gender = result.p_gender.toUpperCase().charAt(0);
      if (p_gender == "M") {
        building.properties.bldg_no_male -= 1;
        barangay.properties.brgy_no_male -= 1;
        city.properties.city_no_male -= 1;
      } else if (p_gender == "F") {
        building.properties.bldg_no_female -= 1;
        barangay.properties.brgy_no_female -= 1;
        city.properties.city_no_female -= 1;
      } else {
        res.status(400).send("Invalid gender! M/F only");
      }
      // age: positive number
      if (result.p_age <= 14) {
        building.properties.bldg_no_children -= 1;
        barangay.properties.brgy_no_children -= 1;
        city.properties.city_no_children -= 1;
      } else if (result.p_age <= 24) {
        building.properties.bldg_no_youngadult -= 1;
        barangay.properties.brgy_no_youngadult -= 1;
        city.properties.city_no_youngadult -= 1;
      } else if (result.p_age <= 54) {
        building.properties.bldg_no_adult -= 1;
        barangay.properties.brgy_no_adult -= 1;
        city.properties.city_no_adult -= 1;
      } else if (result.p_age <= 64) {
        building.properties.bldg_no_matureadult -= 1;
        barangay.properties.brgy_no_matureadult -= 1;
        city.properties.city_no_matureadult -= 1;
      } else if (result.p_age > 64) {
        building.properties.bldg_no_elderly -= 1;
        barangay.properties.brgy_no_elderly -= 1;
        city.properties.city_no_elderly -= 1;
      } else {
        res.status(400).send("Invalid age input!");
      }

      // maritalstatus:
      var p_maritalstatus = result.p_maritalstatus.toUpperCase();
      if (p_maritalstatus == "SINGLE") {
        building.properties.bldg_no_single -= 1;
        barangay.properties.brgy_no_single -= 1;
        city.properties.city_no_single -= 1;
      } else if (p_maritalstatus == "MARRIED") {
        building.properties.bldg_no_married -= 1;
        barangay.properties.brgy_no_married -= 1;
        city.properties.city_no_married -= 1;
      } else if (p_maritalstatus == "WIDOWED") {
        building.properties.bldg_no_widowed -= 1;
        barangay.properties.brgy_no_widowed -= 1;
        city.properties.city_no_widowed -= 1;
      } else if (p_maritalstatus == "SEPARATED") {
        building.properties.bldg_no_separated -= 1;
        barangay.properties.brgy_no_separated -= 1;
        city.properties.city_no_separated -= 1;
      } else if (p_maritalstatus == "DIVORCED") {
        building.properties.bldg_no_divorced -= 1;
        barangay.properties.brgy_no_divorced -= 1;
        city.properties.city_no_divorced -= 1;
      } else {
        res.status(400).send("Invalid marital status!");
      }

      // bloodtype: 
      var p_bloodtype = result.p_bloodtype.toUpperCase();
      if (p_bloodtype.includes('-') || p_bloodtype.includes('M')) { // minus
        if (p_bloodtype.includes('O')) { // O minus
          building.properties.bldg_no_blood_o_m -= 1;
          barangay.properties.brgy_no_blood_o_m -= 1;
          city.properties.city_no_blood_o_m -= 1;
        } else if (p_bloodtype.includes('AB')) { // AB minus
          building.properties.bldg_no_blood_ab_m -= 1;
          barangay.properties.brgy_no_blood_ab_m -= 1;
          city.properties.city_no_blood_ab_m -= 1;
        } else if (p_bloodtype.includes('A')) { // A minus
          building.properties.bldg_no_blood_a_m -= 1;
          barangay.properties.brgy_no_blood_a_m -= 1;
          city.properties.city_no_blood_a_m -= 1;
        } else if (p_bloodtype.includes('B')) { // B minus
          building.properties.bldg_no_blood_b_m -= 1;
          barangay.properties.brgy_no_blood_b_m -= 1;
          city.properties.city_no_blood_b_m -= 1;
        } else {
          res.status(400).send("Invalid blood type!");
        }
      } else if (p_bloodtype.includes('+') || p_bloodtype.includes('P')) { //plus
        building.properties.bldg_no_married -= 1;
        barangay.properties.brgy_no_married -= 1;
        city.properties.city_no_married -= 1;
        if (p_bloodtype.includes('O')) { // O plus
          building.properties.bldg_no_blood_o_p -= 1;
          barangay.properties.brgy_no_blood_o_p -= 1;
          city.properties.city_no_blood_o_p -= 1;
        } else if (p_bloodtype.includes('AB')) { // AB plus
          building.properties.bldg_no_blood_ab_p -= 1;
          barangay.properties.brgy_no_blood_ab_p -= 1;
          city.properties.city_no_blood_ab_p -= 1;
        } else if (p_bloodtype.includes('A')) { // A plus
          building.properties.bldg_no_blood_a_p -= 1;
          barangay.properties.brgy_no_blood_a_p -= 1;
          city.properties.city_no_blood_a_p -= 1;
        } else if (p_bloodtype.includes('B')) { // B plus
          building.properties.bldg_no_blood_b_p -= 1;
          barangay.properties.brgy_no_blood_b_p -= 1;
          city.properties.city_no_blood_b_p -= 1;
        } else {
          res.status(400).send("Invalid blood type!");
        }
      } else {
        res.status(400).send("Invalid blood type!");
      }

      // DELETE PERSON: UPDATE BUILDING, BARANGAY, City values
      building.save();
      barangay.save();
      city.save();

      Person.deleteOne(checkPSN)
        .then(() => res.json('Person deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));

    }
  });
});

//adds Person to collection
// Note: Assumes may building ID na si person, if wala need mag geocode from address
router.route('/add').post(async (req, res) => {

  const checkPSN = {p_psn_number: req.body.p_psn_number}; // check niya muna if may existing tao na
                                                          // with this PSN, if meron, error siya

  var result = await Person.findOne(checkPSN, async (err, result) => {
    if (result != null){ // may person na with that PSN
      res.status(400).json("PSN Number existing already!");
    } else { // wala pang tao with that PSN, pwede tayo mag-add sa kanya

      // PHASE 1: Hanapin yung building, barangay at city ng person
      var building  = await Building.findOne({"properties.bldg_id": String(req.body.p_bldg_id)}); // si bldg_id galing sa
                                                        // building schema, si req,body.p_bldg_id
                                                        // galing sa person schema
      var barangay  = await Barangay.findOne({"properties.brgy_id": String(req.body.p_brgy_id)});
      var city  = await City.findOne({"properties.city_id": String(req.body.p_city_id)});
      
      if (building == null){
        res.status(400).json("Building does not exist in database");
      } else if (barangay == null){
        res.status(400).json("Barangay does not exist in database");
      } else if (city == null){
        res.status(400).json("City does not exist in database");
      }; 

      // PHASE 2: Update statistics per building, barangay, and city
      building.properties.bldg_no_resident += 1;
      barangay.properties.brgy_no_resident += 1;
      city.properties.city_no_resident += 1;
      // lahat ng attributes dagdagan mo ng tig 1 based sa property
      // gender: M/F
      var p_gender = req.body.p_gender.toUpperCase().charAt(0);
      if (p_gender == "M") {
        building.properties.bldg_no_male += 1;
        barangay.properties.brgy_no_male += 1;
        city.properties.city_no_male += 1;
      } else if (p_gender == "F") {
        building.properties.bldg_no_female += 1;
        barangay.properties.brgy_no_female += 1;
        city.properties.city_no_female += 1;
      } else {
        res.status(400).json("Invalid gender! M/F only");
      }
      // age: positive number
      if (req.body.p_age <= 14) {
        building.properties.bldg_no_children += 1;
        barangay.properties.brgy_no_children += 1;
        city.properties.city_no_children += 1;
      } else if (req.body.p_age <= 24) {
        building.properties.bldg_no_youngadult += 1;
        barangay.properties.brgy_no_youngadult += 1;
        city.properties.city_no_youngadult += 1;
      } else if (req.body.p_age <= 54) {
        building.properties.bldg_no_adult += 1;
        barangay.properties.brgy_no_adult += 1;
        city.properties.city_no_adult += 1;
      } else if (req.body.p_age <= 64) {
        building.properties.bldg_no_matureadult += 1;
        barangay.properties.brgy_no_matureadult += 1;
        city.properties.city_no_matureadult += 1;
      } else if (req.body.p_age > 64) {
        building.properties.bldg_no_elderly += 1;
        barangay.properties.brgy_no_elderly += 1;
        city.properties.city_no_elderly += 1;
      } else {
        res.status(400).json("Invalid age input!");
      }

      // maritalstatus:
      var p_maritalstatus = req.body.p_maritalstatus.toUpperCase();
      if (p_maritalstatus == "SINGLE") {
        building.properties.bldg_no_single += 1;
        barangay.properties.brgy_no_single += 1;
        city.properties.city_no_single += 1;
      } else if (p_maritalstatus == "MARRIED") {
        building.properties.bldg_no_married += 1;
        barangay.properties.brgy_no_married += 1;
        city.properties.city_no_married += 1;
      } else if (p_maritalstatus == "WIDOWED") {
        building.properties.bldg_no_widowed += 1;
        barangay.properties.brgy_no_widowed += 1;
        city.properties.city_no_widowed += 1;
      } else if (p_maritalstatus == "SEPARATED") {
        building.properties.bldg_no_separated += 1;
        barangay.properties.brgy_no_separated += 1;
        city.properties.city_no_separated += 1;
      } else if (p_maritalstatus == "DIVORCED") {
        building.properties.bldg_no_divorced += 1;
        barangay.properties.brgy_no_divorced += 1;
        city.properties.city_no_divorced += 1;
      } else {
        res.status(400).json("Invalid marital status!");
      }

      // bloodtype: 
      var p_bloodtype = req.body.p_bloodtype.toUpperCase();
      if (p_bloodtype.includes('-') || p_bloodtype.includes('M')) { // minus
        if (p_bloodtype.includes('O')) { // O minus
          building.properties.bldg_no_blood_o_m += 1;
          barangay.properties.brgy_no_blood_o_m += 1;
          city.properties.city_no_blood_o_m += 1;
        } else if (p_bloodtype.includes('AB')) { // AB minus
          building.properties.bldg_no_blood_ab_m += 1;
          barangay.properties.brgy_no_blood_ab_m += 1;
          city.properties.city_no_blood_ab_m += 1;
        } else if (p_bloodtype.includes('A')) { // A minus
          building.properties.bldg_no_blood_a_m += 1;
          barangay.properties.brgy_no_blood_a_m += 1;
          city.properties.city_no_blood_a_m += 1;
        } else if (p_bloodtype.includes('B')) { // B minus
          building.properties.bldg_no_blood_b_m += 1;
          barangay.properties.brgy_no_blood_b_m += 1;
          city.properties.city_no_blood_b_m += 1;
        } else {
          res.status(400).json("Invalid blood type! (Negative)");
        }
      } else if (p_bloodtype.includes('+') || p_bloodtype.includes('P')) { //plus
        building.properties.bldg_no_married += 1;
        barangay.properties.brgy_no_married += 1;
        city.properties.city_no_married += 1;
        if (p_bloodtype.includes('O')) { // O plus
          building.properties.bldg_no_blood_o_p += 1;
          barangay.properties.brgy_no_blood_o_p += 1;
          city.properties.city_no_blood_o_p += 1;
        } else if (p_bloodtype.includes('AB')) { // AB plus
          building.properties.bldg_no_blood_ab_p += 1;
          barangay.properties.brgy_no_blood_ab_p += 1;
          city.properties.city_no_blood_ab_p += 1;
        } else if (p_bloodtype.includes('A')) { // A plus
          building.properties.bldg_no_blood_a_p += 1;
          barangay.properties.brgy_no_blood_a_p += 1;
          city.properties.city_no_blood_a_p += 1;
        } else if (p_bloodtype.includes('B')) { // B plus
          building.properties.bldg_no_blood_b_p += 1;
          barangay.properties.brgy_no_blood_b_p += 1;
          city.properties.city_no_blood_b_p += 1;
        } else {
          res.status(400).json("Invalid blood type! (Positive)");
        }
      } else {
        res.status(400).json("Invalid blood type!");
      }

      const newItem = new Person(req.body);

      // UPDATE BUILDING, BARANGAY, City
      building.save();
      barangay.save();
      city.save();

      newItem.save()
        .then(() => res.json('Person added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      res.status(200);
    }
  });
});

/* UPDATE persons listing. */
//source: https://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
router.route('/update').post((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/persons/update",
                                      // eto yung ieexcute niya na function
  const query = {p_psn_number : req.body.p_psn_number};
  Person.findOneAndUpdate(query, req.body) // pwede ka maglagay ng query dito to further specify sorting methods
    .then( (items) =>{
      res.json(items);
      res.json("Persons updated:", items.n);
      items.save();
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;