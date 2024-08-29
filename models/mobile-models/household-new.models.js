const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HouseholdMobileSchema = new Schema({
  "householdNo": {type: Array},
  "properties": {type: Object},
  "coordinates": {type: Object},
});

const HouseholdMobile = mongoose.model("household_mobile", HouseholdMobileSchema);
module.exports = HouseholdMobile;