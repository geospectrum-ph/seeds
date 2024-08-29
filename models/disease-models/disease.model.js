const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Point version of Disease

const diseaseSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties":{
        disease_id: {type: String},
        disease: {type: String},
        // city_name: {type: String},
        brgy_id: {type: String},
        // brgy_name: {type: String},
        date: {type: String},
        status: {type: String},
        remarks: {type: String},
        mtd_id: {type: String}
    },
    "geometry":{
        "type": { type: String, default: "Point" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
const Disease = mongoose.model('Disease', diseaseSchema, 'diseases');

module.exports = Disease;