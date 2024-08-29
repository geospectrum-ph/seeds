const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Point version of Commercial

const commercialSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties":{
        commercial_id: {type: String},
        inst_class:{type: String},
        brgy_id: {type: String}, // PSGC Code
        date: {type: String}, // (Expiration?) date on registration
        name: {type: String},
        owner: {type: String},
        employees: {type: Number},
        capitalization: {type: Number},
        class: {type: String}, // commercial institution type
        remarks: {type: String},
        mtd_id: {type: String}
    },
    "geometry":{
        "type": { type: String, default: "Point" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
const Commercial = mongoose.model('Commercial_Points', commercialSchema, 'commercial_pts');

module.exports = Commercial;