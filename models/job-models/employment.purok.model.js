const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Purok version of Employment

const employmentSchema = new Schema({
    employment_id: {type: String},
    job_class:{type: String},
    brgy_id: {type: String}, // PSGC Code
    purok_id: {type: String}, // PurokID appended to PSGC Code
    date: {type: String},
    female: {type: Number},
    male: {type: Number},
    total: {type: Number},
    remarks: {type: String},
    mtd_id: {type: String}
});

// Pangalanan natin yung Schema na ginawa mo
const Employment = mongoose.model('Employment_Purok', employmentSchema, 'employment_purok');

module.exports = Employment;