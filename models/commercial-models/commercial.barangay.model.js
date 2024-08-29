const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Barangay version of Employment

const commercialSchema = new Schema({
    commercial_id: {type: String},
    inst_class:{type: String}, // = Commercial (because there are other institutions)
    brgy_id: {type: String}, // PSGC Code
    institution_count: {type: Number}, // number of institutions
    capitalization_total: {type: Number}, // total capitalization
    employees_total: {type: Number}, // total number of employees
    class: {type: String}, // commercial institution type
    date: {type: String}, // Date of upload?
    remarks: {type: String},
    mtd_id: {type: String}
});

// Pangalanan natin yung Schema na ginawa mo
const Commercial = mongoose.model('Commercial_Barangay', commercialSchema, 'commercial_brgy');

module.exports = Commercial;