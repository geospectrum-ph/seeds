const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Barangay version of Employment

const householdPopulationSchema = new Schema({
    housing_unit_serial_number: {type: String}, // Foreign key
    population_id:{type: String}, // Primary key
    // brgy_id: {type: String}, 
    name: {type: String},  // full name?
    land_use: {type: Number},
    is_household_head: {type: String}, 
    relationship_to_household_head: {type: String}, // optional?
    gender: {type: String},
    date_of_birth: {type: String}, // DDMMYYYY
    marital_status: {type: String},
    occupation: {type: String}, 
    profession: {type: String},
    date: {type: String}, // Date of upload?
    remarks: {type: String},
    mtd_id: {type: String}
});

// Pangalanan natin yung Schema na ginawa mo
const householdPopulation = mongoose.model('Household_Population', householdPopulationSchema, 'household_population');

module.exports = householdPopulation;