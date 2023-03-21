const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Point version of Disease

const facilitySchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties":{
        facility_id: {type: String},
        name: {type: String},
        type: {type: String},
        brgy_id: {type: String},
        remarks: {type: String},
        mtd_id: {type: String}
    },
    "geometry":{ //test
        "type": { type: String, default: "Point" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
const Facility = mongoose.model('HealthFacility', facilitySchema, 'health_facilities');

module.exports = Facility;