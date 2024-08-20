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
const citySchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties": {
        "city_id": String,
        "city_name": String,
        "city_lat": Number,
        "city_lon": Number,
        "city_no_resident": { type: Number, default: 0 },
        "city_no_male": { type: Number, default: 0 },
        "city_no_female": { type: Number, default: 0 },
        "city_no_children": { type: Number, default: 0 }, //<=14 yrs. old
        "city_no_youngadult": { type: Number, default: 0 }, //15-24 yrs. old
        "city_no_adult": { type: Number, default: 0 }, //25-54 yrs. old
        "city_no_matureadult": { type: Number, default: 0 }, //55-64 yrs. old
        "city_no_elderly": { type: Number, default: 0 }, //>=65 yrs. old
        "city_no_single": { type: Number, default: 0 },
        "city_no_married": { type: Number, default: 0 },
        "city_no_widowed": { type: Number, default: 0 },
        "city_no_separated": { type: Number, default: 0 },
        "city_no_divorced": { type: Number, default: 0 },
        "city_no_blood_o_p": { type: Number, default: 0 }, //O plus
        "city_no_blood_o_m": { type: Number, default: 0 }, //O minus
        "city_no_blood_a_p": { type: Number, default: 0 },
        "city_no_blood_a_m": { type: Number, default: 0 },
        "city_no_blood_b_p": { type: Number, default: 0 },
        "city_no_blood_b_m": { type: Number, default: 0 },
        "city_no_blood_ab_p": { type: Number, default: 0 },
        "city_no_blood_ab_m": { type: Number, default: 0 },
    },
    //"city_email": String, //wala to sa DBDiag
    //"city_contactnumber": String, //wala to sa DBDiag
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
const City = mongoose.model('City', citySchema, 'cities');

module.exports = City;