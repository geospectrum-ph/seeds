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
const buildingSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties": {
        "bldg_id": String,
        "bldg_brgy_id": String, // kukunin niya to from barangays collections
        "bldg_city_id": String, // kukunin niya to from cities collections
        "bldg_lat": Number,
        "bldg_lon": Number,
        "bldg_type": String,
        "bldg_address": String,
        "bldg_name": String,
        "bldg_hiring": { type: Boolean, default: false },
        "bldg_no_floor": { type: Number, default: 0 },
        "bldg_no_unit": { type: Number, default: 0 },
        "bldg_no_resident": { type: Number, default: 0 },
        "bldg_no_male": { type: Number, default: 0 },
        "bldg_no_female": { type: Number, default: 0 },
        "bldg_no_children": { type: Number, default: 0 }, //<=14 yrs. old
        "bldg_no_youngadult": { type: Number, default: 0 }, //15-24 yrs. old
        "bldg_no_adult": { type: Number, default: 0 }, //25-54 yrs. old
        "bldg_no_matureadult": { type: Number, default: 0 }, //55-64 yrs. old
        "bldg_no_elderly": { type: Number, default: 0 }, //>=65 yrs. old
        "bldg_no_single": { type: Number, default: 0 },
        "bldg_no_married": { type: Number, default: 0 },
        "bldg_no_widowed": { type: Number, default: 0 },
        "bldg_no_separated": { type: Number, default: 0 },
        "bldg_no_divorced": { type: Number, default: 0 },
        "bldg_no_blood_o_p": { type: Number, default: 0 }, //O plus
        "bldg_no_blood_o_m": { type: Number, default: 0 }, //O minus
        "bldg_no_blood_a_p": { type: Number, default: 0 },
        "bldg_no_blood_a_m": { type: Number, default: 0 },
        "bldg_no_blood_b_p": { type: Number, default: 0 },
        "bldg_no_blood_b_m": { type: Number, default: 0 },
        "bldg_no_blood_ab_p": { type: Number, default: 0 },
        "bldg_no_blood_ab_m": { type: Number, default: 0 },
    },
    //"bldg_email": String, //wala to sa DBDiag
    //"bldg_contactnumber": String, //wala to sa DBDiag
    // "image": {data: Buffer,
    //     contentType: { type: String, default: 'image/jpeg' }}, // medyo weird yung pagdefine sa image
    //                                                            // pero copy paste nalang muna if need

    //Eto yung kapag may Geometry ka na involved, uncomment mo nalang then copy paste
    "geometry":{
        "type": { type: String, default: "Polygon" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
const Building = mongoose.model('Building', buildingSchema, 'buildings');

module.exports = Building;