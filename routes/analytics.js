var router = require('express').Router();
const turf = require('@turf/turf');

let Barangay = require('../models/barangay.model');
let Commercial_Points = require('../models/commercial-models/commercial.point.model');
let Commercial_Barangay = require('../models/commercial-models/commercial.barangay.model');
let Disease = require('../models/disease-models/disease.model');
let Disease_Barangay = require('../models/disease-models/disease.barangay.model');
let Employment_Points = require('../models/job-models/employment.point.model');
let Employment_Barangay = require('../models/job-models/employment.barangay.model');
let Household_Shape = require('../models/household-models/household.shape');
let Household_Population = require('../models//household-models/household.population');

let Style = require('../models/style.model');
let LandUse = require('../models/landuse.model');

var layersMapping = {
  "Commercial_Barangay": {
    "model": Commercial_Barangay,
    "brgy_id": "brgy_id",
    "date": "date",
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Economic",
    "domain": "Commerce, Trade and Industry",
    "subdomain": "Commercial Establishments",
    "granularity": "Barangay"
  }, "Commercial_Points": {
    "model": Commercial_Points, 
    "brgy_id":"properties.brgy_id",
    "date": "properties.date",
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Economic",
    "domain": "Commerce, Trade and Industry",
    "subdomain": "Commercial Establishments",
    "granularity": "Point"
  }, "Disease_Barangay": {
    "model": Disease_Barangay,
    "brgy_id": "brgy_id",
    "date": "date",
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Social",
    "domain": "Health",
    "subdomain": "Disease Incidence",
    "granularity": "Barangay"
  }, "Disease": {
    "model": Disease,
    "brgy_id": "properties.brgy_id",
    "date": "properties.date",
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Social",
    "domain": "Health",
    "subdomain": "Disease Incidence",
    "granularity": "Point"
  }, "Employment_Barangay": {
    "model": Employment_Barangay,
    "brgy_id": "brgy_id",
    "date": "date",
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Demographic",
    "domain": "Labor Force Profile",
    "subdomain": "Jobs",
    "granularity": "Barangay"
  }, "Employment_Points": {
    "model": Employment_Points,
    "brgy_id":"properties.brgy_id",
    "date": "properties.date",
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Demographic",
    "domain": "Labor Force Profile",
    "subdomain": "Jobs",
    "granularity": "Point"
  }, "LandUse": {
    "model": LandUse,
    "brgy_id":null,
    "date": "properties.date_end",
    "subcategories": [],
    "json_type": null,
    "geometry":"geometry.coordinates",
    "mtd_id_list": [],
    "module": "Environmental",
    "domain": "Land Use and Land Use Trends",
    "subdomain": "Existing Land Use",
    "granularity": "Barangay"
  }, "Household_Shape": {
    "model": Household_Shape,
    "brgy_id":null,
    "date": null,
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Demographic",
    "domain": "Census Level Profile",
    "subdomain": "Household Surveys",
    "granularity": "Point"
  }, "Household_Population": {
    "model": Household_Population,
    "brgy_id":null,
    "date": null,
    "subcategories": [],
    "json_type": null,
    "mtd_id_list": [],
    "module": "Demographic",
    "domain": "Census Level Profile",
    "subdomain": "Household Surveys",
    "granularity": "Building"
  }
}

const getAvailableLayers = async (layersMapping) => {
  var availableLayers = []
  var counter = 0 // indicates whether the loop is done or not
  var layerKeys = Object.keys(layersMapping)
  return loop = new Promise((resolve, reject) => {
    layerKeys.forEach( async (key) => {
      var layer = layersMapping[key]["model"] // gets layer model
      const layerName = key; // get layerName
      const count = await layer.collection.estimatedDocumentCount(); // get number of documents for layer
  
      if (count > 0){ // this layer is available
        availableLayers.push(layerName)
      }
      counter += 1 
      if (counter === layerKeys.length){ // check if it looped for all
        resolve(availableLayers);
      }
    })
  }).then(() => {return availableLayers;}) // async/await solution: https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val
}

const getAvailableLayersWithJsonType = async (layersMapping) => {
  var availableLayers = []
  var counter = 0 // indicates whether the loop is done or not
  var layerKeys = Object.keys(layersMapping)

  return loop = new Promise((resolve, reject) => {
    layerKeys.forEach( async (key) => {
      var jsonType = layersMapping[key]["json_type"] // gets json_type           
      const layerName = key; // get layerName

      const count = layersMapping[key]["mtd_id_list"].length // get number of uplaoded datasets for layer
      var element = {'layer_name': layerName, 'json_type': jsonType} // setup element

      if (count > 0){ // this layer is available
        availableLayers.push(element)
      }
      counter += 1 
      if (counter === layerKeys.length){ // check if it looped for all
        resolve(availableLayers);               
      }
    })
  }).then(() => {return availableLayers;}) // async/await solution: https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val
}

var currentAvailableLayers // initialize list of all current available layers

const setCurrentAvailableLayers = async (layersMapping) => {
  await getAvailableLayers(layersMapping)
  .then((out) => {
    currentAvailableLayers = out
  })
  .then(async () => {
    await getAvailableLocations()
  })
  .then(() => { })
}

setCurrentAvailableLayers(layersMapping)
/* GET layers listing. */
router.route('/getlayers').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/getlayers/,
  // eto yung ieexcute niya na function
  await getAvailableLayersWithJsonType(layersMapping).then((data) => { 
    res.json(data);
  })
})

const checkJsonType = (item) => {
  var checkTypePropGeom = [0, 0, 0];
  var pathsLength = Object.keys(item.schema.paths).length; // number of paths 
  var c = 0 // counter
  return new Promise((resolve, reject) => {
    item.schema.eachPath(function(path, schemaType) {
      if (path == 'type'){
        checkTypePropGeom[0] = 1;
      } else if (path.includes("geometry.") ){
        checkTypePropGeom[1] = 1;
      } else if (path.includes("properties.")){
        checkTypePropGeom[2] = 1;
      }
      c += 1 
    })
    if (c === pathsLength){
      resolve()
    }
  }).then(async () => {
    if (checkTypePropGeom[0] === 1 && checkTypePropGeom[1] === 1 && checkTypePropGeom[2] === 1){
      var geojsontype = 'geojson.'
      await item.findOne().then((i) => {
        if (i){
          geojsontype = geojsontype.concat(i.geometry.type)
        } else {
          geojsontype = 'undefined'
        }
      })
      return geojsontype;
    } else {
      return 'json'
    }
  }) 
}

async function getpropertiesfromSchema (item, index){
  var schemaProp = [];
  item.schema.eachPath(function(path, schemaType) {
    if (false){
    } else {
      schemaProp.push([path, schemaType.instance])
    }
  })
}

var schemaList = [Commercial_Points, Commercial_Barangay, Disease, Disease_Barangay, Employment_Points, Employment_Barangay, Style, LandUse]

schemaList.forEach(getpropertiesfromSchema);

async function getClasses(collection, key){
  // eto yung ieexcute niya na function
  if (key === null){
    return [];
  }
  var query = key || "brgy_id"
  var collection = collection
  var output = null

  await collection.distinct(query)
    .then(items => {output = items})
    .catch(err => {});
  
  return output
};


const getAvailableLocations = async (layerArray) => { // returns array of barangay intersections based on layerArray
  if (layerArray === undefined){
    layerArray = currentAvailableLayers // default value is all available layers
  }
  var availableLocations = []
  var intersection = []
  return loop = new Promise((resolve, reject) => {
    layerArray.forEach(async (key) => {
      var subcategories = []
      var c = 0
      var layer = layersMapping[key]["model"] // gets layer model
      var brgyID = layersMapping[key]["brgy_id"] //gets brgy id
      
      var brgyArrays = await getClasses(layer, brgyID)
      availableLocations.push(brgyArrays)

      var jsonType = await checkJsonType(layer);
      
      layer.schema.eachPath(async function(path,schemaType) {
      // condition for ignoring paths when returning subcategories
        if (path.includes("brgy_id") || path.toLowerCase() == "date"  || path.includes("properties.date") || path.includes("geometry.type") || path == "type" || path.includes("remarks") || path.includes("_id") || path.includes("__v") || path.includes("geometry.coordinates")){
          if (path.includes("mtd_id")){
            layersMapping[key]['mtd_id_list'] = await getClasses(layer, path)
          }
        } else {
          var subcat = {}
          subcat['column_name'] = path
          subcat['schematype'] = schemaType.instance
          subcat['checked'] = false; // for front checkbox
          var label = path
          if (jsonType === 'json'){
            label = label.replace("_", " ")
            label = label.charAt(0).toUpperCase() + label.slice(1)
            subcat['column_label'] = label
            layersMapping[key]["json_type"] = jsonType
          } else if (jsonType === 'geojson.Point' || jsonType === 'geojson.Polygon'){
            label = label.split(".").slice(-1)[0] 
            label = label.replace("_", " ")
            label = label.charAt(0).toUpperCase() + label.slice(1)
            subcat['column_label'] = label
            layersMapping[key]["json_type"] = jsonType;
          } if (schemaType.instance == 'String'){
            subcat['column_classes'] = await getClasses(layer, path)
            subcategories.push(subcat)
          } if (schemaType.instance == 'Number'){
            subcategories.push(subcat)
          }
        } if (availableLocations.length > c){
          layersMapping[key]["subcategories"] = subcategories
          c += 1
        } if (c === layerArray.length){
          resolve()
        }
      })
    })
  }).then(() => {
    intersection = availableLocations[0]
    availableLocations.forEach(async (locations, index)=>{// source: https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
      intersection = intersection.filter(x => locations.includes(x));  // updates intersection
    })
  }).then(async () => {intersection = await getBarangayNamesFromId(intersection)})
  .then(() => {
      return intersection;
  })
}

const getBarangayNamesFromId = async (brgyIdArray) => {
  const query = {"properties.brgy_id": {$in: brgyIdArray}} // in operator
  var barangayNames = []

  return loop = new Promise(async (resolve, reject) => { 
    await Barangay.find(query)
    .then((barangays) => {
      if (barangays.length === 0){
        resolve() // no intersections
      }
      barangays.forEach((barangay, index) => {
        var element = {
          label: barangay.properties.brgy_name, 
          value: barangay.properties.brgy_id
        }
        barangayNames.push(element)
        if (index === barangays.length - 1){ 
          resolve() 
        }
      })
    })
  }).then(() => {
    return barangayNames
  })
}

const getSubcategories = async (layerArray) => {
  var subcategories = [];
  return loop = new Promise(async (resolve, reject) => {
    layerArray.forEach(async (key) =>{
      var subcat = layersMapping[key]['subcategories']
      subcategories.push(subcat);
      if(subcategories.length === layerArray.length){
        resolve()
      }
    })
  })
  .then(() => {
    return subcategories
  })
}

const getSpecificSubcategory = async (layerKey, specific_subcategory) => {
    // initialize subcateogories with barangay field 
    // basis: client\src\containers\seedsFeatures\diseaseIncidence\index.js line 90
  var subcategories = [ 

  ];
  if (layersMapping[layerKey].mtd_id_list.length === 0){
      return null
  }
  return loop = new Promise(async (resolve, reject) => {
    try {
      var subcat = layersMapping[layerKey]['subcategories']
      var filtered_subcat = await subcat.filter(function (item) {
        return getProperty(item, "column_name") == specific_subcategory;
      });
      filtered_subcat = filtered_subcat[0] // get first element
      if (filtered_subcat['schematype'] === 'Number'){
        var subcat_element = {
          headerName: filtered_subcat['column_label'],
          field: filtered_subcat['column_name'],
          width: 150
        }
        subcategories.push(subcat_element)
        if (subcategories.length === 1){ 
          resolve()
        }   
      } else if (filtered_subcat['schematype'] === 'String'){
        filtered_subcat['column_classes'].forEach((column_class) => {
          var label = column_class.replace("_", " ")
          label = label.charAt(0).toUpperCase() + label.slice(1)
          
          var subcat_element = {
            headerName: label,
            field: column_class,
            width: 150
          }
          subcategories.push(subcat_element)
          if(subcategories.length === filtered_subcat['column_classes'].length){
            // all column_classes
            resolve()
          }
        })
      }
    }
    catch (err){
      reject()
      console.log('err', err)
    }
  })
  .then(() => {
      return subcategories
  })
  .catch((err) => {
      return null
  })
}

// get property of json object using path on jsons with nested jsons
// Source: https://stackoverflow.com/questions/9463233/how-to-access-nested-json-data
function getProperty(json, path) {
  var tokens = path.split(".");
  var obj = json;
  for (var i = 0; i < tokens.length; i++) {
    obj = obj[tokens[i]];
  }
  return obj;
}

// In Javascript, how do I check if an array has duplicate values?
// Source: https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

const basicAnalysis = async (layerArray, subcateogories, locationArray, date_start, date_end) => {
  const query_barangay = {"properties.brgy_id": {$in: locationArray}} // in operator
  var basicAnalysisObject = []
  var c = 0; // counter

  return loop = new Promise(async (resolve, reject) => { 
    await Barangay.find(query_barangay)
    .then((barangays) => {
      if (barangays.length === 0){
        resolve() // no intersections
      }
      barangays.forEach((barangay, index) => {
        var element = {
          type: barangay.type,
          properties: {
            brgy_name: barangay.properties.brgy_name,
            brgy_id: barangay.properties.brgy_id
          },
          geometry: barangay.geometry
        }
        layerArray.forEach(async (key0, index2) => {
          if(hasDuplicates(layerArray)){ // if layerArray contains duplicates
            var key = key0 + "_" + index2.toString() // to account for 2 same layers selected
          } else { // if it doesn't contain duplicates
            var key = key0 // original
          }
          var layer = layersMapping[key0]["model"]; // get layer model
          var brgyID = layersMapping[key0]["brgy_id"]; //get brgy id path
          var jsonType = layersMapping[key0]["json_type"] // get jsonType
          var date_path = layersMapping[key0]["date"]; // get date path /////////// SOON

          var query_layer = {} // initialize query json
          query_layer[date_path] = { $gte: date_start, $lte: date_end }, // set query for date ///////////// SOON
          query_layer[brgyID] = barangay.properties.brgy_id // set to find current barangay id in layer model
          var selected_columns = [] // initialize selected columns
          var c2 = 0 // 2nd counter
          element.properties[key] = {} // initialize empty json for properties in current key in layerArray
          subcateogories[index2].forEach(async (subcat, index3) => { // for the current subcategory referring to current element in layerArray
            var schematype = subcat.schematype; // get schematype
            var column_name = subcat.column_name; // get path (column name)
            var column_label = subcat.column_label; // get column_label (alias)
            element.properties[key][column_name] = {  // initialize empty values and column_label
              "values": [], // values for selected subcategories go in here
              "column_label": column_label // this is the alias
            }

            if(schematype === "String"){ // if property is a string
              query_layer[column_name] = {$in: subcat.column_classes} // in operator for string schematype
              selected_columns.push({"column_name": column_name, "schematype": schematype, "column_classes": subcat.column_classes}) // this will be included in the selected columns
              // query for each subcat.column_classes here? No. Baka kasi may mutually exclusive na subcategories
            } else if (schematype === "Number"){ // if property is a number
              selected_columns.push({"column_name": column_name, "schematype": schematype}) // this will be included in the selected columns
              // query for column_name here?  No. Baka kasi may mutually exclusive na subcategories
            }
            if (selected_columns.length === subcateogories[index2].length){ // if it just finished looping through the whole subcategories[index2]
              await layer.find(query_layer).then((found_documents) => {
                if (found_documents.length === 0){ // if there are no found documents in the query
                  c += 1
                  if (basicAnalysisObject.includes(element) != true){
                    basicAnalysisObject.push(element)
                  }

                  if (c == (barangays.length)*(layerArray.length)){
                    resolve()
                  }
                } else { // if there are found documents for the query
                      // NOTE: may tig-iisang ganto ata kada case: json, geojson.Point, geojson.Polygon
                  if (jsonType === 'json'){
                    found_documents.forEach((doc, index4)=>{ // iterate through array of found documents after query
                      selected_columns.forEach((selected_col, index5) => { // iterate through all selected columns
                        var col_name = selected_col["column_name"];
                        var sch_type = selected_col["schematype"];
                        if (doc[col_name]){ // if doc[selected_col] is defined
                          element.properties[key][col_name]["values"].push(doc[col_name]) // add selected column values to element
                        } else {
                            //pass
                        }
                        if (index4 === found_documents.length-1 && sch_type === 'Number'){
                          // get sum: https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
                          element.properties[key][col_name]["sum"] = element.properties[key][col_name]["values"].reduce((a,b) => a + b, 0)
                          element.properties[key][col_name]["mean"] = element.properties[key][col_name]["sum"] / element.properties[key][col_name]["values"].length                                  
                        }
                      })
                      if (index4 === found_documents.length-1 && c <  barangays.length*layerArray.length){
                        c += 1 
                        if (basicAnalysisObject.includes(element) != true){
                          basicAnalysisObject.push(element)
                        }
                      } if (c == (barangays.length)*(layerArray.length)){
                        resolve()
                      }
                    })
                  } else if (jsonType === 'geojson.Point'){
                    selected_columns.forEach((selected_col, index5) => { // iterate through all selected columns
                      var col_name = selected_col["column_name"]
                      var sch_type = selected_col["schematype"]
                      if (sch_type == 'String'){ // if the current subcategory is a string
                        var col_classes = selected_col["column_classes"]
                        col_classes.forEach(async (col_class, index6) => { // through all selected categories
                          var filtered_values = await found_documents.filter(function (item) {
                            return getProperty(item, col_name) == col_class;
                          });
                          element.properties[key][col_name]["values"].push(filtered_values.length) // add selected column values to element
                          if (index6 === col_classes.length-1){
                            // get sum: https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
                            element.properties[key][col_name]["sum"] = element.properties[key][col_name]["values"].reduce((a,b) => a + b, 0)
                            element.properties[key][col_name]["mean"] = element.properties[key][col_name]["sum"] / element.properties[key][col_name]["values"].length                                  
                          }
                        })
                      } else if (sch_type == 'Number'){ // if the current subcategory is a number
                        // push all values of all documents in found_documents to elements.properties[key][col_name]["values"]
                        found_documents.forEach((doc, index4)=>{ // iterate through array of found documents after query
                          if (doc[col_name]){ // if doc[selected_col] is defined
                            element.properties[key][col_name]["values"].push(doc[col_name]) // add selected column values to element
                          } else { }
                          if (index4 === found_documents.length-1){
                            // get sum: https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
                            element.properties[key][col_name]["sum"] = element.properties[key][col_name]["values"].reduce((a,b) => a + b, 0)
                            element.properties[key][col_name]["mean"] = element.properties[key][col_name]["sum"] / element.properties[key][col_name]["values"].length                                  
                          }
                        })
                      } if (c <  barangays.length*layerArray.length && index5 === selected_columns.length-1){
                        c += 1  
                        if (basicAnalysisObject.includes(element) != true){
                          basicAnalysisObject.push(element)
                        }
                      } if (c == (barangays.length)*(layerArray.length)){
                        resolve()
                      }
                    })
                  } else if (jsonType === 'geojson.Polygon'){

                  }
                }    
              })
            }
          })
        })
      })
    })
  }).then(() => {
    currentBasicAnalysisObject = basicAnalysisObject // assign basicAnalysisObject to currentBasicAnalysisObject
    return basicAnalysisObject
  })
}

const createAnalyticsOutputs = (currentBasicAnalysisObject) => { // Creates table from currentBasicAnalysisObject
  var stat = 'sum' // chosen statistic name
  var c = 0 // counter
  var analyticsTable = {
    "count": 0,
    "columns": {}, 
    "values": []
  }

  var analyticsGraph

  var analyticsMap = {
    "barangays": [], // barangay shapefiles with corresponding values
    "centroids": [] // centroids of barangay shapefiles with corresponding values
  }

  if (currentBasicAnalysisObject){
    return loop = new Promise( async (resolve, reject) => { 

      var values_paths = {} // initialize empty json for getting each numeric values per selected layer

      var element0 = currentBasicAnalysisObject[0] // get first item in array
      var properties0 = element0['properties'] // get properties
      var propKeys0 = Object.keys(properties0) // get keys in properties
      propKeys0.forEach((key) => { // iterate through each property keys
        label = key.replace("_", " ")
        label = label.charAt(0).toUpperCase() + label.slice(1)
        analyticsTable['columns'][key] = label // asign a label per key (column)

        if (key === "brgy_name" || key === "brgy_id"){ // if it's the one defining the barangay
          // do nothing
        } else { // if it's a value from the chosen layers
          var layer_values = properties0[key]; // get layer_values
          var layerSubcatKeys = Object.keys(layer_values); // get keys of layer's subcategories
          layerSubcatKeys.forEach((subcatKey, index) => {
            if (index === 0 && (values_paths.hasOwnProperty(key) === false)){ // first loop and no values_path for current key yet
              values_paths[key] = subcatKey // assign the first one as initialsubcatKey
            } else if (layer_values[subcatKey].hasOwnProperty(stat)) {  // if it contains sum (chosen statistic name)
              values_paths[key] = subcatKey // assign this subcatKey as values_paths[key] because it contains the sum
            }
          })
        }
      })
      
      currentBasicAnalysisObject.forEach((element, index) => { // for each element in currentBasicAnalysisObject
        var entry = {} // initialize entry object per element in the table
        var properties = element['properties'] // get properties of current barangay shapefile element
        var propKeys = Object.keys(properties) // get keys in properties
        var brgyGeom = {
          'type': element['type'], // get type of current barangay shapefile element
          'geometry': element['geometry'], // get geometry of current barangay shapefile element
          'properties': {}
        } // initialize brgyGeom for analyticsMap
        
        propKeys.forEach((key) => { // for each key in properties
          if (key === "brgy_name" || key === "brgy_id"){ // if it's the one defining the barangay
            entry[key] = properties[key] // store in element as is
          } else { // if it's a value from the chosen layers
            var valuePath = values_paths[key] // get path for key
            entry[key] = properties[key][valuePath][stat] // get corresponding path considering the chosen statistic name
          } 

          if (Object.keys(entry).length === propKeys.length){ // if it finished populated entry
            analyticsTable["values"].push(entry) // push entry to values 
            analyticsTable['count'] += 1 // add 1 to count

            brgyGeom['properties'] = entry // assign entry as properties of the barangay geometry geojson
            var brgyCentroidGeom = turf.centerOfMass(brgyGeom, {properties: entry}) // get centroid of barangay geom and assign entry to its properties

            analyticsMap['barangays'].push(brgyGeom) // push brgyGeom geojson to analyticsMap
            analyticsMap['centroids'].push(brgyCentroidGeom) // push brgyCentroidGeom geojson to analyticsMap

            c += 1 // add 1 to counter
          }

          if (c === currentBasicAnalysisObject.length){
            analyticsGraph = JSON.parse(JSON.stringify(analyticsTable)); // create replica of analyticstabls
            delete analyticsGraph.columns.brgy_name
            delete analyticsGraph.columns.brgy_id
            resolve();
          }
        })   
      })
    }).then( () => {
      return [analyticsTable, analyticsMap, analyticsGraph]
    })
  } else {
    return "Basic analytics object not yet computed. Please initialize by calling the analytics/basicanalysis route."
  }
}

router.route('/getlocations').get(async (req, res) => {
  const layerArray = req.query.layerArray
  await getAvailableLocations(layerArray).then((data) => {
    res.json(data);
  })
})

router.route('/getsubcategories').get(async (req, res) => {
  const layerArray = req.query.layerArray
  await getSubcategories(layerArray).then((data) => {
    res.json(data);
  })
})

router.route('/getsubcategory/single').get(async (req, res) => {
  const layerKey = req.query.layerKey
  const specific_subcategory = req.query.specific_subcategory
  await getSpecificSubcategory(layerKey, specific_subcategory).then((data) => {
    res.json(data);
  })
})

router.route('/basicanalysis').post(async (req, res) => {
  var data = {} // the output data
  const layerArray = req.body.layerArray
  const subcateogories = req.body.subcategories
  const locationArray = req.body.locationArray
  const date_start = req.body.date_start || '00000000'
  const date_end = req.body.date_end || '99999999'
  await basicAnalysis(layerArray, subcateogories, locationArray, date_start, date_end).then( async (data0) => {
    data['basicanalysis'] = data0
    var data1 = await createAnalyticsOutputs(data0)
    data['table'] = data1[0]
    data['map'] = data1[1]
    data['graph'] = data1[2]
  }).then( () => {res.json(data)})
})

//checkJsonType
//USER SELECTS THE METHOD OF SPATIAL ANALYSIS TO BE USED
router.route('/spatialAnalysis').get(async (req, res) => {
  const methodSelected = req.query.methodSelected
  const locationArray = req.query.locationArray
  await spatialAnalytics(methodSelected,locationArray).then((data) => {
    res.json(data);
  })
})
router.route('/layerFilter').get(async (req, res) => {
  const layerArray = req.query.layerArray
  const locationArray = req.query.locationArray
  await layerType(locationArray,layerArray).then((data) => {
    res.json(data)
  })
})
const layerType = async(locationArray,layerArray)=>{
  var layerArray = layerArray
  const query_barangay = {"properties.brgy_id": {$in: locationArray}}
  const methods = []
  const ltype = []
  const method1 = ["Centroid","Area"]
  const method2 = ["Buffer","Interpolate"]
  return loop = new Promise(async (resolve, reject) => { 
    await Barangay.find(query_barangay)
    .then((barangays) => {
      barangays.forEach((barangay) => {
        var type = {
          geometry: barangay.geometry.type
        }
        ltype.push(type)
      })
    })
    var layer = layersMapping[layerArray]["model"] // get layer model
    layer.find().then((layerarrayGeom)=>{
      ltype.push(layerarrayGeom[0].geometry.type)
      ltype.forEach((key)=>{
        if (key == "Polygon" || key == "Multipolygon" ){
          if (String(methods[methods.length - 1]) !== String({"method":method1})) {
            methods.push({"method":method1})
          } resolve()
        } if (key == "Point" && key == "Multipolygon" ){
          if (String(methods[methods.length - 1]) !== String({"method":method1})) {
            methods.push({"method":method1})
          } resolve()
        } if (key == "Point" ){
          if (String(methods[methods.length - 1]) !== String({"method":method2})) {
            methods.push({"method":method2})
          } resolve()
        }
      })
    })
  }).then(() => { return methods })
}

const spatialAnalytics = async (methodSelected,locationArray)=>{
  const query_barangay = {"properties.brgy_id": {$in: locationArray}} // in operator
  const brgyGeom = []
  const landuseGeom = []
  var spatialanalyticsResult = []
  return loop = new Promise(async (resolve, reject) => { 
    await Barangay.find(query_barangay).then((barangays) => {
      barangays.forEach((barangay) => {
        var element = {
          type: barangay.type,
          properties: {
            brgy_name: barangay.properties.brgy_name,
            brgy_id: barangay.properties.brgy_id
          }, geometry: barangay.geometry
        }
        brgyGeom.push(element)
      }
    )})
    LandUse.find().then((landusegeom)=>{
      landusegeom.forEach((key) =>{
        var element = {
          type: key.type,
          properties: {
              Landuse: key.properties.Landuse
          }, geometry: key.geometry
        }
        landuseGeom.push(element)
      })
      intersection = []
      centroid = []
      
      if (methodSelected == "Clip"){
        landuseGeom.forEach((key)=>{
          var clip = turf.intersect(key,brgyGeom[0],{properties:{Landuse:key.properties.Landuse,brgy_id:brgyGeom[0].properties.brgy_id}})
          if (clip != null) {
            spatialanalyticsResult.push(clip)
          }
        })
      } if (methodSelected == "Centroid"){
        brgyGeom.forEach((key)=>{
          spatialanalyticsResult.push(turf.centroid(key,{properties:{brgy_name:key.properties.brgy_name,brgy_id:key.properties.brgy_id}}))
        })
      } if (methodSelected == "Difference"){
        landuseGeom.forEach((key)=>{
          var difference = turf.difference(key,brgyGeom[0],{properties:{Landuse:key.properties.Landuse,brgy_id:brgyGeom[0].properties.brgy_id}})
          if (difference != null){
            spatialanalyticsResult.push(difference)
          }
        })
      } if (methodSelected == "Union"){
        landuseGeom.forEach((key)=>{
          var union = turf.union(key,brgyGeom[0],{properties:{Landuse:key.properties.Landuse,brgy_id:brgyGeom[0].properties.brgy_id}})
          if (union != null){
            spatialanalyticsResult.push(union)
          }
        })
      } if (methodSelected == "Area"){
        brgyGeom.forEach((key)=>{
          spatialanalyticsResult.push({properties:{brgy_name:key.properties.brgy_name,brgy_id:key.properties.brgy_id,"Area":turf.area(key)}})
        })
      } if (methodSelected === methodSelected){
        resolve() // no intersections
      }
    })
  }).then(() => { return spatialanalyticsResult })
}

router.route('/basicanalysisTable').get(async (req, res) => {
  const startdate = req.query.startdate
  const enddate = req.query.enddate
  const brgyId = req.query.brgy_id
  await analysisTable(startdate,enddate,brgyId).then((data) => {
    res.json(data);
  })
})

const analysisTable = async (startdate,enddate,brgyId)=>{
  const query = {
    "date": { $gte: startdate, $lte: enddate },
    "brgy_id": brgyId
  }

  tableItems = []
  return loop = new Promise(async (resolve, reject) => { 
    await Commercial_Barangay.find(query).then((items) => {
      tableItems.push(items)
      if (items === items){
        resolve()
      }
    })
  }).then(() => {
    return tableItems
  })
}
module.exports = router
// exporting to another file: https://stackoverflow.com/questions/7612011/how-to-get-a-variable-from-a-file-to-another-file-in-node-js
module.exports.layersMapping = layersMapping;