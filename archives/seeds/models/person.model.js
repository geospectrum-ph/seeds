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
const personSchema = new Schema({
    "p_status": Boolean, // False = Expired/Deceased
    "p_bldg_id": String, // kukunin niya to from buildings collections
    "p_brgy_id": String, // kukunin niya to from barangays collections
    "p_city_id": String, // kukunin niya to from cities collections
    "p_lastname": String,
    "p_firstname": String,
    "p_middlename": String,
    "p_address": String,
    "p_gender": String,
    "p_maritalstatus": String,
    "p_bloodtype": String,
    "p_birthdate": String,
    "p_age": Number,
    "p_contactnumber": String,
    "p_email": String,
    "p_contactnumber": String,
    "image": {data: Buffer,
        contentType: { type: String, default: 'image/jpeg' }}, // medyo weird yung pagdefine sa image
                                                               // pero copy paste nalang muna if need
    "p_psn_number": String,
    "p_job": String,
    "p_healthstatus": String,

    // Eto yung kapag may Geometry ka na involved, uncomment mo nalang then copy paste
    // "geometry":{
    //     "type":{"type":"String"},
    //     "coordinates":{"type":"array"},
    // }
});

// Pangalanan natin yung Schema na ginawa mo
const Person = mongoose.model('Person', personSchema);

module.exports = Person;