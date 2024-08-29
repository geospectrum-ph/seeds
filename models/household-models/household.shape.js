const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// This refers to Barangay version of Employment

const householdShapeSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties": {type: Object},
    "geometry":{
        "type": { type: String, default: "Polygon" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
// mongoose.model(singular name of collection, schema, name in database)
const householdShape = mongoose.model('Household_Shape', householdShapeSchema, 'household_shape'); 

module.exports = householdShape;