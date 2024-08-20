const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Barangay version of Generic Model

const genericSchema = new Schema({
    genericPropertiesMapping_id: {type: String},
    keywords: {type: String}, // Used to determine subdomain under SEEDS profile
    // Map out the properties e.g. type, statistics, etc. of the dataset to the CSV column names being defined by the user
    // Usage: {<property> : <column name/s>}
    // properties to be mapped: brgy_id, date, class (boolean/strings), figures (numbers), remarks
    // applicable filters: by range: date, figures; by type: brgy_id, class; *by boolean: with or without remarks*
    // Sample: {"brgy_id": "Barangay ID ko to", "date" : "Ito yung date", "class" : ["Job Class", "Job Subclass"], "figures": ["Male", "Female", "Total"]}
    propertiesMapping: { // for all barangay datasets under keywords
        brgy_id: {type: String}, // map out brgy_id column of user's CSV file
        date: {type: String}, // map out date column of user's CSV file
        class: {type: Array, default: []}, // map out class column/s of user's CSV file
        figures: {type: Array, default: []}, // map out figures column/s of user's CSV file
        remarks: {type: String} // map out remarks column of user's CSV file
    }, 
});

// Pangalanan natin yung Schema na ginawa mo
const Generic = mongoose.model('Generic_PropertiesMapping_Barangay', genericSchema, 'generic_propertiesMapping_brgy');

module.exports = Generic;