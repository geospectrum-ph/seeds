var router = require('express').Router();

let Barangay = require('../models/barangay.model');
let Household_Shape = require('../models/household-models/household.shape.js');
let Household_Population = require('../models/household-models/household.population.js');

async function findShapesUsingPointOrPolygon(Shapes, pointOrPolygon){

  // shapes = target shape
  // pointOrPolygon = point or polygon used to geointersected with shape to query it

  var foundShapes2 = [];
  await Shapes.find({ // hanapin yung shapes gamit geospatial query na $geointersects
    "geometry": {
      "$geoIntersects": {
        "$geometry": pointOrPolygon
      }
    }
  }).lean() // returns as json object, not as query metadata
  // source: https://stackoverflow.com/questions/9952649/convert-mongoose-docs-to-json
  .then(foundShapes => {foundShapes2 = foundShapes})
  .catch(err => {});

  if(foundShapes2.length > 0){ // kung may laman
    return foundShapes2
  } else {
    return []
  }
}

/* GET barangays listing. */
// Source: https://stackoverflow.com/questions/27820794/how-to-use-geointersects-in-mongodb-properly
router.route('/click').get(async (req, res) => { // bale pag pumunta ka sa "http://ec2-52-90-134-187.compute-1.amazonaws.com/barangay/findBarangay",
                                                  // eto yung ieexcute niya na function
  const pointOrPolygon = { 
    type: 'Point', 
    coordinates: [parseFloat(req.query.long), parseFloat(req.query.lat)] 
  }; // save as a point

  var household_population_items = null;
  var household_shape_items = await findShapesUsingPointOrPolygon(Household_Shape, pointOrPolygon); // hanapin yung selectedBrgy based sa Barangay na mag-iintersect sa pointOrPolygon

  console.log("household", household_shape_items)
  if (household_shape_items.length > 0){
    var housing_unit_serial_number = household_shape_items[0].properties.BLDG_ID.toString();
    var query_pop = {
      "housing_unit_serial_number": housing_unit_serial_number
    }
    var household_population_items = await filterModel(Household_Population, query_pop)

    // insert age per item in household_population_items
    if (household_population_items.length > 0){
      household_population_items.forEach((item, index) => {
        household_population_items[index]['age'] = getAge(item.date_of_birth)
      })
    }
  }
  var data = {
    "Household_Shape": household_shape_items,
    "Household_Population": household_population_items
  }
  res.status(200).json(data);
});

// click (1 shape only), get (filter only w/ barangay, table (for any Household_Population objects being returned)
const setupGteLte = (min, max, str = null) => {
  if (str){
    if (min && max){
      return {$gte: min, $lte: max}
    } else if (min){
      return {$gte: min}
    } else if (max){
      return {$lte: max}
    } else {
      return null
    }
  } else {
    if (min && max){
      return {$gte: parseFloat(min), $lte: parseFloat(max)}
    } else if (min){
      return {$gte: parseFloat(min)}
    } else if (max){
      return {$lte: parseFloat(max)}
    } else {
      return null
    }
  }
}

const setupGeointersects = (pointOrPolygon) => {
  if (pointOrPolygon){
    var query = {
      "$geoIntersects": {
        "$geometry": pointOrPolygon
      }
    }
    return query
  } else { return null }
}

const cleanupQuery = (query) => {
  var newQuery = {}
  for (var key in query){
    if(query[key]){
      newQuery[key] = query[key];
    }
  }
  return newQuery;
}

const filterModel = async (model, query) => {
  var results = null;

  return filteredItems = new Promise(async (resolve, reject) => {
    console.log('entering promise!')
    model.find(query).lean()
    .then(result => {
      results = result
    }).then (() => {
      console.log('resolving promise!')
      resolve()
    })
  }).then(() => {
    return results
  })
}

// get property of json object using path on jsons with nested jsons
// Source: https://stackoverflow.com/questions/9463233/how-to-access-nested-json-data
function getProperty(json, path) {
  try {
    var tokens = path.split(".");
    var obj = json;
    for (var i = 0; i < tokens.length; i++) {
      obj = obj[tokens[i]];
    }
    return obj;
  } catch (err) {
    return 'n/a'
  }
}

// get unique values from json array
// source: https://www.codegrepper.com/code-examples/javascript/get+unique+values+from+json+array+typescript
// source: https://stackoverflow.com/questions/17780508/selecting-distinct-values-from-a-json
function uniqueByKey(array, key) {
  return [...new Set(array.map((x)=>{
    return getProperty(x, key)
  }))]
}

// function to get age from date_of_birth
// Source: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function getAge(dateString) {
  try {
    // dateString: "19961109"
    // get year month and day
    var year = dateString.slice(0,4);
    var month = dateString.slice(4,6);
    var day = dateString.slice(6,8);
    
    //convert dateString to "1996-11-09"
    dateString = year + "-" + month + "-" + day

    // calculate age
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } catch (err) { return null}  
}

// function to filter date_of_birth using age
const age2date_of_birth = (age_min, age_max) => {
  var now = new Date();
  var utc_plus8 = new Date(now.getTime() + 8*60*60*1000).toISOString().slice(0,10) ;  // format: "2006-10-25"
  var utc_plus8_arr = utc_plus8.split('-') // split by -
  utc_plus8 = utc_plus8_arr[0] + utc_plus8_arr[1] + utc_plus8_arr[2] // format: "20061025"
  var year_current = parseFloat(utc_plus8_arr[0]); // current year as a float
  var date_min = null
  var date_max = null
  if (age_min){
    age_min = parseFloat(age_min) // convert to float
    var year_min = year_current - age_min; // get mininum year
    date_min = year_min.toString() + utc_plus8_arr[1] + utc_plus8_arr[2] // get minimum date
  }
  if (age_max){
    age_max = parseFloat(age_max) // convert to float
    var year_max = year_current - age_max; // get mininum year
    date_max = year_max.toString() + utc_plus8_arr[1] + utc_plus8_arr[2] // get minimum date
  }
  return setupGteLte(date_max, date_min, true);
}

// get household shape & household population using filters    
router.route('/get').get(async (req, res) => {

  const brgy_id = req.query.brgy_id || null;
  var brgy_shp = null;
  var brgy_shp_geom = null; 

  console.log(brgy_id)
  if (brgy_id){
    brgy_shp = await Barangay.findOne({ "properties.brgy_name": brgy_id });
    brgy_shp_geom = setupGeointersects(brgy_shp.geometry); // issue here: centroid isn't the basis of geospatial query, so the ones in borders gets called in different boundaries
  }

  // household shape
  const housing_unit_serial_number = req.query.housing_unit_serial_number || null;
  const area = setupGteLte(req.query.area_min, req.query.area_max);
  const address_field = req.query.address_field || null;
  const land_use = req.query.land_use || null;
  const number_of_storeys = setupGteLte(req.query.number_of_storeys_min, req.query.number_of_storeys_max);
  const type_of_material = req.query.type_of_material || null;
  const no_members = setupGteLte(req.query.no_members_min, req.query.no_members_max);
  
  // household population
  const name = req.query.name || null;
  const is_household_head = req.query.is_household_head || null;
  const gender = req.query.gender || null;
  const date_of_birth = age2date_of_birth(req.query.age_min, req.query.age_max);
  const occupation = req.query.occupation || null;
  const profession = req.query.profession || null;

  // Setup queries
  // var query_shp = {
  //   "properties.housing_unit_serial_number": parseInt(housing_unit_serial_number), // not working. Must use regex or must convert to string. Irrelevant. No feature to search using housing_unit_serial_number
  //   "properties.area": area,
  //   "properties.address_field": address_field,
  //   "properties.land_use": land_use,
  //   "properties.number_of_storeys": number_of_storeys,
  //   "properties.type_of_material": type_of_material,
  //   "properties.no_members": no_members,
  //   "geometry": brgy_shp_geom
  // }

  var query_shp = {
    "properties.BLDG_ID": parseInt(housing_unit_serial_number), // not working. Must use regex or must convert to string. Irrelevant. No feature to search using housing_unit_serial_number
    "properties.IMP_AREA": area,
    "properties.FULL_ADD": address_field,
    "properties.ACT_USED": land_use,
    "properties.NO_OF_FLRS": number_of_storeys,
    "properties.type_of_material": type_of_material,
    "properties.no_members": no_members,
    "geometry": brgy_shp_geom
  }

  var query_pop = {
    "housing_unit_serial_number": housing_unit_serial_number,
    "name": name,
    "is_household_head": is_household_head, 
    "gender": gender,
    "date_of_birth": date_of_birth, // YYYYMMDD
    "occupation": occupation, 
    "profession": profession, 
  };

  // remove null values in the query
  query_shp = await cleanupQuery(query_shp);
  query_pop = await cleanupQuery(query_pop);

  // get items
  // NOTE: isama ang edad (computed from date of birth)
  var household_shape_items = await filterModel(Household_Shape, query_shp)
  var household_population_items = await filterModel(Household_Population, query_pop)

  // insert age per item in household_population_items
  if (household_population_items.length > 0){
    household_population_items.forEach((item, index) => {
      household_population_items[index]['age'] = getAge(item.date_of_birth)
    })
  }

  // Get intersection of both datasets
  // yung intersection ay para ma account yung "And" logic ng filters for both Household_Shape and Household_Population datasets
  // notes: pag 0 yung no_members sa household, check Household_Population kung wala talaga. Kung wala, skip siya sa pag kuha ng intersection ng dataset
  // intersection = availableLocations[0]
  // availableLocations.forEach(async (locations, index)=>{// source: https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
  //     intersection = intersection.filter(x => locations.includes(x));  // updates intersection
  //     // intersect.push(intersection)  
  // })
  // get intersection if both lengths are > 0
  if (Object.keys(query_shp).length > 0 || Object.keys(query_pop).length > 0){ // when filtered by shp or pop
    // get unique housing serial number for each filtered items
    // var serial_shp_array = uniqueByKey(household_shape_items, 'properties.housing_unit_serial_number')
    var serial_shp_array = uniqueByKey(household_shape_items, 'properties.BLDG_ID')

    var serial_pop_array = uniqueByKey(household_population_items, 'housing_unit_serial_number')

    // get intersection of unique housing serial numbers for each
    var serial_intersection_array = serial_pop_array.filter((x) => serial_shp_array.includes(parseFloat(x)));

    // get serial_nodata_array to determine which houses contains 0 or NaN members 
    // get intersection if there's no query for the Household_Population
    var serial_nodata_array = []
    if (Object.keys(query_pop).length == 0){
      household_shape_items.forEach((item, i) => {
        // if (item.properties.no_members > 0) {}
        if (item.properties.no_members) {}
        else { 
          // serial_nodata_array.push(item.properties.housing_unit_serial_number.toString())
          serial_nodata_array.push(item.properties.BLDG_ID.toString())

        }
      })
      serial_intersection_array = serial_intersection_array.concat(serial_nodata_array)
    }

    // get intersection of each filtered sets using the serial_intersection_array
    household_shape_items = household_shape_items.filter((household_shape_item) => {
      if (household_shape_item.properties){ // catching errors for items without properties
        var x = household_shape_item.properties.BLDG_ID || -9999999999999
        return serial_intersection_array.includes(x.toString());
      }
    })
    household_population_items = household_population_items.filter((household_pop_item) => {
      var x = household_pop_item.housing_unit_serial_number || '-9999999999999'
      return serial_intersection_array.includes(x);
    })
  }
  var data = {
    "Household_Shape": household_shape_items,
    "Household_Population": household_population_items
  }
  res.status(200).json(data);
});

router.route('/mandaGet').get((req, res) => {
  Household_Shape.find({"properties.mtd_id": "MTD019"})
    .then(items => res.status(200).json(items))
    .catch(err => console.log(err))
})

module.exports = router;