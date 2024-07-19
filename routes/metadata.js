var router = require('express').Router();
let Metadata = require('../models/metadata.model'); // access the Metadata model collection
var { layersMapping } = require('./analytics')

const formatDate = (dateString) => {
  const dow_md_yr_t = dateString.split(',') // day of week, month day, year, time
  const md = dow_md_yr_t[1].split(/[ ,]+/).filter(Boolean); // month day (https://stackoverflow.com/questions/10346722/how-can-i-split-a-javascript-string-by-white-space-or-comma)
  const m = md[0].slice(0, 3) // first 3 letters of month

  const d = md[1] // day
  const d2 = d.slice(0, d.length-2) // formatted day
  const mdy2 = m + ' ' + d2 + dow_md_yr_t[2]

  const newDate = new Date(mdy2).toLocaleDateString("en-US"); // e.g. 9/7/2016 source: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  const [month, day, year] = newDate.split('/');
  var yearMonthDay = "0".concat(year).slice(-4)+"/"+"0".concat(month).slice(-2)+"/"+"0".concat(day).slice(-2)

  return yearMonthDay + ',' + dow_md_yr_t[3]
}

/* GET metadata listing. */
router.route('/').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/",
                                      // eto yung ieexcute niya na function
  const query = req.body;
  Metadata.find(query).then(items => res.json(items.map((x)=>{
    upload_date = x.upload_date || 'n/a'
    if(upload_date != 'n/a'){
      upload_date = formatDate(x.upload_date)
    }
    return {
      name: x.name,
      id: x.id,
      type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
      tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
            x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
      downloaded: false,
      keywords: x.properties.keywords,
      properties: x.properties,
      upload_date: upload_date
    }
  }))).catch(err => res.status(400).json('Error: ' + err));
});

/* GET metadata listing. */
router.route('/checkData').get(async (req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/",
                                      // eto yung ieexcute niya na function
  const selected = req.query.selected;
  const data = []

  for (i = 0; i < selected.length; i++) {
    var result = await Metadata.findOne({id: selected[i]}).clone()
    if (result.type != "shp") {data.push(result)}
  }
  res.status(200).json(data);
});

  //adds Metadata to collection
router.route('/add').post((req, res) => {
  const checkID = {"id": req.body.id}; // check niya muna if may existing metadata na
                                              // with this ID, if meron, error siya
  var result = Metadata.findOne(checkID, (err, result) => {
    if (result != null){ // may metadata na with that ID
      res.status(400).send();
    } else { // wala pang metadata with that ID, pwede tayo mag-add sa kanya
      const newItem = new Metadata(req.body);
      newItem.save().then(() => res.json('Metadata added!'))
        .catch(err => res.status(400).json('Error: ' + err));

      res.status(200);
    }
  }).clone();
});

/* UPDATE metadata listing. */
router.route('/update').post((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/update",
                                      // eto yung ieexcute niya na function
  const query = {"id": req.body.id};
  Metadata.findOneAndUpdate(query, req.body) // pwede ka maglagay ng query dito to further specify sorting methods
    .then( (items) =>{
      res.json("Metadata updated:", items.n);
      items.save();
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

/* GET metadata listing for domains. */
router.route('/getdomains').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/getdomains",
  // eto yung ieexcute niya na function
  var layersMappingKeys = Object.keys(layersMapping)
  var data = {
    "domain_no": 0,
    "domain_items": []
  }
  var loop = new Promise((resolve, reject) => {
    layersMappingKeys.forEach((key) => { // loop over all layersMapping (domains)
      const mtd_id_list = layersMapping[key]['mtd_id_list'] // get list of mtd_id for this domain
      const json_type = layersMapping[key]['json_type'] // get json_type for this domain
      const subcategories = layersMapping[key]['subcategories'] // get list of subcategories for this domain
      const LayerModule = layersMapping[key]['module'] // get module e.g. Demographic
      const domain = layersMapping[key]['domain'] // get domain e.g. Census Level Profile 
      const subdomain = layersMapping[key]['subdomain'] // get subdomain e.g. Household Surveys
      const granularity = layersMapping[key]['granularity'] // get granularity e.g. Building

      var domain_item = { // current domain item element
        "Module": LayerModule,
        "Domain": domain,
        "Subdomain": subdomain,
        "Granularity": granularity,
        "domain_name": key,
        "mtd_id_list": mtd_id_list,
        "json_type": json_type,
        "subcategories": subcategories,
        "metadata": []
      }
      if (mtd_id_list.length > 0){ // if there are exisiting datasets for this layersMapping item
        const query = { "id": { $in: mtd_id_list }}; // query to get all datasets containing these metadata ids

        Metadata.find(query).then(items => (items.map((x)=>{
          upload_date = x.upload_date || 'n/a'
          if(upload_date != 'n/a'){
            upload_date = formatDate(x.upload_date)
          }
          domain_item.metadata.push({
            name: x.name,
            id: x.id,
            type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
            tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
            x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
            downloaded: false,
            keywords: x.properties.keywords,
            upload_date: upload_date
          })
        }
        ))).then(() => {
          data.domain_items.push(domain_item) // push populated domain item
          data.domain_no += 1
          if (data.domain_no == layersMappingKeys.length){
            resolve()
          }
        }).catch(err => res.status(400).json('Error: ' + err));
      } else {
        data.domain_items.push(domain_item) // push empty domain item
        data.domain_no += 1
        if (data.domain_no == layersMappingKeys.length){
          resolve()
        }
      }
    })
  })
  loop.then(() => {
    res.json(data)
  })
});

/* GET metadata Social listing for domains. */
router.route('/getdomainssocial').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/getdomains",
  // eto yung ieexcute niya na function
  var layersMappingKeys = Object.keys(layersMapping)
  var data = {
    "domain_no": 0,
    "domain_items": []
  }
  var loop = new Promise((resolve, reject) => {
    layersMappingKeys.forEach((key) => { // loop over all layersMapping (domains)
      const mtd_id_list = layersMapping[key]['mtd_id_list'] // get list of mtd_id for this domain
      const json_type = layersMapping[key]['json_type'] // get json_type for this domain
      const subcategories = layersMapping[key]['subcategories'] // get list of subcategories for this domain
      const LayerModule = layersMapping[key]['module'] // get module e.g. Demographic
      const domain = layersMapping[key]['domain'] // get domain e.g. Census Level Profile 
      const subdomain = layersMapping[key]['subdomain'] // get subdomain e.g. Household Surveys
      const granularity = layersMapping[key]['granularity'] // get granularity e.g. Building
      var domain_item = { // current domain item element
        "Module": LayerModule,
        "Domain": domain,
        "Subdomain": subdomain,
        "Granularity": granularity,
        "domain_name": key,
        "mtd_id_list": mtd_id_list,
        "json_type": json_type,
        "subcategories": subcategories,
        "metadata": []
      }

      if (mtd_id_list.length > 0){ // if there are exisiting datasets for this layersMapping item
        const query = { "id": { $in: mtd_id_list }}; // query to get all datasets containing these metadata ids
        Metadata.find(query).then(items => (items.map((x)=>{
          upload_date = x.upload_date || 'n/a'
          if(upload_date != 'n/a'){
            upload_date = formatDate(x.upload_date)
          }
          domain_item.metadata.push({
            name: x.name,
            id: x.id,
            type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
            tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
            x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
            downloaded: false,
            keywords: x.properties.keywords,
            upload_date: upload_date
          })
        }))).then(() => { 
          data.domain_items.push(domain_item) // push populated domain item
          data.domain_no += 1  

          if (data.domain_no == layersMappingKeys.length){
            resolve()
          }
        }).catch(err => res.status(400).json('Error: ' + err));
      } else {
        data.domain_items.push(domain_item) // push empty domain item
        data.domain_no += 1
        if (data.domain_no == layersMappingKeys.length){
          resolve()
        }
      }
    })
  })
  loop.then(() => {
    //filter data domain items Module: "Social"
    var filtered_data = [];
    data.domain_items.forEach((item) => {
      if(item.Module === "Social"){
        filtered_data.push(item)
      }
    });
    res.json(filtered_data)
  })
});

/* GET metadata Economic listing for domains. */
router.route('/getdomainseconomic').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/getdomains",
  // eto yung ieexcute niya na function
  var layersMappingKeys = Object.keys(layersMapping)
  var data = {
    "domain_no": 0,
    "domain_items": []
  }
  var loop = new Promise((resolve, reject) => {
    layersMappingKeys.forEach((key) => { // loop over all layersMapping (domains)
      const mtd_id_list = layersMapping[key]['mtd_id_list'] // get list of mtd_id for this domain
      const json_type = layersMapping[key]['json_type'] // get json_type for this domain
      const subcategories = layersMapping[key]['subcategories'] // get list of subcategories for this domain
      const LayerModule = layersMapping[key]['module'] // get module e.g. Demographic
      const domain = layersMapping[key]['domain'] // get domain e.g. Census Level Profile 
      const subdomain = layersMapping[key]['subdomain'] // get subdomain e.g. Household Surveys
      const granularity = layersMapping[key]['granularity'] // get granularity e.g. Building
      var domain_item = { // current domain item element
        "Module": LayerModule,
        "Domain": domain,
        "Subdomain": subdomain,
        "Granularity": granularity,
        "domain_name": key,
        "mtd_id_list": mtd_id_list,
        "json_type": json_type,
        "subcategories": subcategories,
        "metadata": []
      }
      if (mtd_id_list.length > 0){ // if there are exisiting datasets for this layersMapping item
        const query = { "id": { $in: mtd_id_list }}; // query to get all datasets containing these metadata ids
        Metadata.find(query).then(items => (items.map((x)=>{
          upload_date = x.upload_date || 'n/a'
          if(upload_date != 'n/a'){
            upload_date = formatDate(x.upload_date)
          }
          domain_item.metadata.push({
            name: x.name,
            id: x.id,
            type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
            tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
            x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
            downloaded: false,
            keywords: x.properties.keywords,
            upload_date: upload_date
          })
        }))).then(() => {
          data.domain_items.push(domain_item) // push populated domain item
          data.domain_no += 1  
          if (data.domain_no == layersMappingKeys.length){
            resolve()
          }
        }).catch(err => res.status(400).json('Error: ' + err));
      } else {
        data.domain_items.push(domain_item) // push empty domain item
        data.domain_no += 1
        if (data.domain_no == layersMappingKeys.length){
          resolve()
        }
      }
    })
  })
  loop.then(() => {
    //filter data domain items Module: "Social"
    var filtered_data = [];
    data.domain_items.forEach((item) => {
      if(item.Module === "Economic"){
        filtered_data.push(item)
      }
    });
    res.json(filtered_data)
  })
});

/* GET metadata Environmentals listing for domains. */
router.route('/getdomainsenvironmental').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/getdomains",
  // eto yung ieexcute niya na function
  var layersMappingKeys = Object.keys(layersMapping)
  var data = {
    "domain_no": 0,
    "domain_items": []
  }
  var loop = new Promise((resolve, reject) => {
    layersMappingKeys.forEach((key) => { // loop over all layersMapping (domains)
      const mtd_id_list = layersMapping[key]['mtd_id_list'] // get list of mtd_id for this domain
      const json_type = layersMapping[key]['json_type'] // get json_type for this domain
      const subcategories = layersMapping[key]['subcategories'] // get list of subcategories for this domain
      const LayerModule = layersMapping[key]['module'] // get module e.g. Demographic
      const domain = layersMapping[key]['domain'] // get domain e.g. Census Level Profile 
      const subdomain = layersMapping[key]['subdomain'] // get subdomain e.g. Household Surveys
      const granularity = layersMapping[key]['granularity'] // get granularity e.g. Building
      var domain_item = { // current domain item element
        "Module": LayerModule,
        "Domain": domain,
        "Subdomain": subdomain,
        "Granularity": granularity,
        "domain_name": key,
        "mtd_id_list": mtd_id_list,
        "json_type": json_type,
        "subcategories": subcategories,
        "metadata": []
      }
      if (mtd_id_list.length > 0){ // if there are exisiting datasets for this layersMapping item
        const query = { "id": { $in: mtd_id_list }}; // query to get all datasets containing these metadata ids
        Metadata.find(query).then(items => (items.map((x)=>{
          upload_date = x.upload_date || 'n/a'
          if(upload_date != 'n/a'){
            upload_date = formatDate(x.upload_date)
          }
          domain_item.metadata.push({
            name: x.name,
            id: x.id,
            type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
            tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
            x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
            downloaded: false,
            keywords: x.properties.keywords,
            upload_date: upload_date
          })
        }))).then(() => {
          data.domain_items.push(domain_item) // push populated domain item
          data.domain_no += 1  
          if (data.domain_no == layersMappingKeys.length){
            resolve()
          }
        }).catch(err => res.status(400).json('Error: ' + err));
      } else {
        data.domain_items.push(domain_item) // push empty domain item
        data.domain_no += 1
        if (data.domain_no == layersMappingKeys.length){
          resolve()
        }
      }
    })
  })
  loop.then(() => {
    //filter data domain items Module: "Social"
    var filtered_data = [];
    data.domain_items.forEach((item) => {
      if(item.Module === "Environmental"){
        filtered_data.push(item)
      }
    });
    res.json(filtered_data)
  })
});


/* GET metadata Demographics listing for domains. */
router.route('/getdomainsdemographic').get((req, res) => { // bale pag pumunta ka sa "https://seeds-demo.geospectrum.com.ph/metadata/getdomains",
  // eto yung ieexcute niya na function
  var layersMappingKeys = Object.keys(layersMapping)
  var data = {
    "domain_no": 0,
    "domain_items": []
  }
  var loop = new Promise((resolve, reject) => {
    layersMappingKeys.forEach((key) => { // loop over all layersMapping (domains)
      const mtd_id_list = layersMapping[key]['mtd_id_list'] // get list of mtd_id for this domain
      const json_type = layersMapping[key]['json_type'] // get json_type for this domain
      const subcategories = layersMapping[key]['subcategories'] // get list of subcategories for this domain
      const LayerModule = layersMapping[key]['module'] // get module e.g. Demographic
      const domain = layersMapping[key]['domain'] // get domain e.g. Census Level Profile 
      const subdomain = layersMapping[key]['subdomain'] // get subdomain e.g. Household Surveys
      const granularity = layersMapping[key]['granularity'] // get granularity e.g. Building
      var domain_item = { // current domain item element
        "Module": LayerModule,
        "Domain": domain,
        "Subdomain": subdomain,
        "Granularity": granularity,
        "domain_name": key,
        "mtd_id_list": mtd_id_list,
        "json_type": json_type,
        "subcategories": subcategories,
        "metadata": []
      }

      if (mtd_id_list.length > 0){ // if there are exisiting datasets for this layersMapping item
        const query = { "id": { $in: mtd_id_list }}; // query to get all datasets containing these metadata ids
        Metadata.find(query).then(items => (items.map((x)=>{
          upload_date = x.upload_date || 'n/a'
          if(upload_date != 'n/a'){
            upload_date = formatDate(x.upload_date)
          }
          domain_item.metadata.push({
            name: x.name,
            id: x.id,
            type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
            tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
            x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
            downloaded: false,
            keywords: x.properties.keywords,
            upload_date: upload_date
          })
        }))).then(() => {
          data.domain_items.push(domain_item) // push populated domain item
          data.domain_no += 1  
          if (data.domain_no == layersMappingKeys.length){
            resolve()
          }
        }).catch(err => res.status(400).json('Error: ' + err));
      } else {
        data.domain_items.push(domain_item) // push empty domain item
        data.domain_no += 1
        if (data.domain_no == layersMappingKeys.length){
          resolve()
        }
      }
    })
  })
  loop.then(() => {
    //filter data domain items Module: "Social"
    var filtered_data = [];
    data.domain_items.forEach((item) => {
      if(item.Module === "Demographic"){
        filtered_data.push(item)
      }
    });
    res.json(filtered_data)
  })
});

router.route('/getMetaDataSocialProperties/:id').get((req, res) => {
  const query = {"id": req.params.id};
  Metadata.find(query)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
 })

router.route('/update/MetaDataSocialProperties/:id').put((req, res) => {
  const query = {"id": req.params.id};
  Metadata.find(query)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
 })

router.route('/metadataproperties/:id').put((req, res) => {
  Metadata.updateOne({"id" : req.params.id}, 
    {
      "$set": {
        "properties.description": req.body.description,
        "properties.language": req.body.language,
        "properties.license": req.body.license,
        "properties.doi": req.body.doi,
        "properties.attribution": req.body.attribution,
        "properties.regions": req.body.regions,
        "properties.dqs": req.body.dqs,
        "properties.restrictions": req.body.restrictions,
        "properties.constraints": req.body.constraints,
        "properties.details": req.body.details,
      }
    }
  ).then(() => res.json('Properties updated!'))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;