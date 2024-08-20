const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

const shapefileSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties": {type: Object},
    "geometry":{
        "type": { type: String, default: "Polygon" },
        "coordinates":{"type":"array"},
    }
});

// Pangalanan natin yung Schema na ginawa mo
const Shapefile = mongoose.model('Shapefile', shapefileSchema, 'shapefiles');

module.exports = Shapefile;