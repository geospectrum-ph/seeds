const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Barangay version of Disease

const diseaseSchema = new Schema({
    disease_id: {type: String},
    disease:{type: String},
    brgy_id: {type: String}, // PSGC Code
    date: {type: String},
    new_active: {type: Number},
    new_death: {type: Number},
    new_recovered: {type: Number},
    remarks: {type: String},
    mtd_id: {type: String}
});

// Pangalanan natin yung Schema na ginawa mo
const Disease = mongoose.model('Disease_Barangay', diseaseSchema, 'diseases_brgy');

module.exports = Disease;