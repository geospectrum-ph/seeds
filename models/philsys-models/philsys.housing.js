const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const philsyshousingSchema = new Schema({
    PSGC_code: {type: String},
    Building_ID:{type: String},
    Housing_Unit_Serial_Number: {type: Number},
    Household_Serial_Number:{type: Number},
    Address_Field: {type: String},
    Land_Use: {type: String},
    Number_of_Storeys: {type: Number},
    Type_of_Material: {type: String},
});
const philsysHousing = mongoose.model('PhilSYS Housing', philsyshousingSchema);
module.exports = philsysHousing;