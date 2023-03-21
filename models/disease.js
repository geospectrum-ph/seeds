const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Barangay version of Disease

const diseaseSchemasample = new Schema({
    diseaseID: {type: Number, default: 0 },
    disease:{type: String, default: "NA" },
    status: {type: String, default: "NA" }, // PSGC Code
    latitude: {type: Number, default: 0 },
    longitude: {type: Number, default: 0 },
    date: {type: Number, default: 0 },
    remarks: {type: String, default: "NA" }
});

// Pangalanan natin yung Schema na ginawa mo
const Disease = mongoose.model('DiseaseSample', diseaseSchemasample);

module.exports = Disease;