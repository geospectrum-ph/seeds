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
const sessionSchema = new Schema({
    "userId": String,
    "populate": {type: Object, default: {}},
    "catalogue": {type: Object, default: {}},
    "map": {type: Object, default: {}},
    "profile": {type: Object, default: {}},
    "analytics": {type: Object, default: {}}
    
});

// Pangalanan natin yung Schema na ginawa mo
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;