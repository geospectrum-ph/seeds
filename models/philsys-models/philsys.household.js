const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const philsyshouseholdSchema = new Schema({
    Housing_Unit_Serial_Number: {type: Number},
    Household_Serial_Number:{type: Number},
    Date_reviewed: {type: String},
    Number_of_Household_Members: {type: Number},
    Number_of_Male_Members: {type: Number},
    Number_of_Female_Members: {type: Number},
    Tenure_Status: {type: String},
    Language_Dialect_at_Home: {type: String},
});
const philsysHousehold = mongoose.model('PhilSYS Household', philsyshouseholdSchema);
module.exports = philsysHousehold;