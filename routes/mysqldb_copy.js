const {createPool} = require("mysql")
var router = require('express').Router();

let philsysmalolos = require('../models/philsysmodel');
let philsysHousehold = require('../models/philsys-models/philsys.household');
let philsysHousing = require('../models/philsys-models/philsys.housing');
let philsysPop = require('../models/philsys-models/philsys.population');

var tableList = {
  "malolos": {
    "schemaName":"philsysmalolos",
    "model": philsysmalolos
  }, "household": {
    "schemaName":"philsysHousehold",
    "model": philsysHousehold
  }, "housing": {
    "schemaName":"philsysHousing",
    "model": philsysHousing
  }, "population": {
    "schemaName":"philsysPop",
    "model": philsysPop
  }
}

router.route('/').get(async (req, res) => {
  const user = req.query.user
  const password = req.query.password
  const database = req.query.database
  const host = req.query.host
  const connectionLimit = req.query.connectionLimit
  const table = req.query.table
  await philsysTable(user,password,database,host,connectionLimit,table).then((data) => {
    res.json(data);
  })
})
const philsysTable = async (user,password,database,host,connectionLimit,table) => {
  const pool = createPool({
    user: user,
    password: password,
    database: database,
    host: host,
    connectionLimit: connectionLimit
  })
  var philsys = [];
  return loop = new Promise(async (resolve, reject) => {
    pool.query(`SELECT * from ${table}`, (err,result, fields)=>{
      if (err){
        // return console.log(err);
      } resolve()
      philsys.push(result)
    })
  }).then(() => {
    philsys=JSON.parse(JSON.stringify(philsys))
    return philsys
  }).then(()=>{
    router.post('/',function(req,res){
      philsys[0].forEach((key)=>{
      var layer = tableList[table]["model"]
      const newphilData = new layer(key)
      newphilData.save()
        .then(() => res.json('PhilSYS DATA ADDED.'))
        .catch((error) => {
          assert.isNotOk(error,'Promise error');
          done();
        });
      })
    })
  })
}

module.exports = router