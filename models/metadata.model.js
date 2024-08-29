const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// The database schema of a database is its structure described in a formal 
// language supported by the database management system (DBMS).
// https://en.wikipedia.org/wiki/Database_schema

//Defining the Schema of a Metadata

// Eto rin pala list of Mongoose DataTypes na pwede gamitin:
// https://mongoosejs.com/docs/schematypes.html
const metadataSchema = new Schema({
    "name": String,
    "id": String,
    "type": String, // csv, shp, tif
    "social": Boolean, // SEEDs tag 
    "economic": Boolean,
    "environmental": Boolean,
    "demographic": Boolean,
    "upload_date": String, // "Monday, May 10th, 2021, 1:04:30 PM"
    "properties": Object, // kahit ano laman para flexible muna
    "visibility": { type: Boolean, default: true }, // to check if it is visible in the layers tab or not

    // Eto yung kapag may Geometry ka na involved, uncomment mo nalang then copy paste
    // "geometry":{
    //     "type":{"type":"String"},
    //     "coordinates":{"type":"array"},
    // }
});

// Pangalanan natin yung Schema na ginawa mo
const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = Metadata;