const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Point version of Employment

const employmentSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties":{
        employment_id: {type: String},
        job_class: {type: String},
        // city_name: {type: String},
        brgy_id: {type: String},
        // brgy_name: {type: String},
        date: {type: String},
        sex: {type: String},
        remarks: {type: String},
        mtd_id: {type: String}
    },
    "geometry":{
        "type": { type: String, default: "Point" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
const Employment = mongoose.model('Employment_Points', employmentSchema, 'employment_pts');

module.exports = Employment;