const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// The database schema of a database is its structure described in a formal
// language supported by the database management system (DBMS).
// https://en.wikipedia.org/wiki/Database_schema

//Defining the Schema of a Person
// eto kokopyahin lang muna yung sa DB Structure natin 
// https://app.creately.com/diagram/7DCZJcj6EdU/edit

// Eto rin pala list of Mongoose DataTypes na pwede gamitin:
// https://mongoosejs.com/docs/schematypes.html
const landUseSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties": {
        "Landuse": String,
        "area": Number,
        "date_start": String,
        "date_end": String,
        "mtd_id": String,
    },
    //Eto yung kapag may Geometry ka na involved, uncomment mo nalang then copy paste
    "geometry":{
        "type": { type: String, default: "Polygon" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
const LandUse = mongoose.model('Land Use', landUseSchema);

module.exports = LandUse;