var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var philsysSchema = new Schema({
    "Serial_number": { type: Number, default: 0 },
    "Shape_Area": { type: Number, default: 0 },
    "Address": { type: String, default: "NA" },
    "Use": { type: String, default: "NA" },
    "Storeys": { type: Number, default: 0 },
    "Type": { type: String, default: "NA" },
    "No_Members": { type: Number, default: 0 },
    "Name": { type: String, default: "NA" },
    "Gender": { type: String, default: "NA" },
    "Age": { type: Number, default: 0 },
    "Birthday": { type: String, default: "NA" },
    "Head": { type: String, default: "NA" },
    "Occupation": { type: String, default: "NA" },
    "Profession": { type: String, default: "NA" }
})

const philsysModel = mongoose.model('PhilSYS', philsysSchema);

module.exports = philsysModel;