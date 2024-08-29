const {Client} = require("pg")
var router = require('express').Router();

let philsysmalolos = require('../models/philsysmodel');
let philsysHousehold = require('../models/philsys-models/philsys.household');
let philsysHousing = require('../models/philsys-models/philsys.housing');
let philsysPop = require('../models/philsys-models/philsys.population');

const tableList = [philsysmalolos, philsysHousehold, philsysHousing, philsysPop]

router.route('/').get(async (req, res) => {
  const user = req.query.user
  const password = req.query.password
  const database = req.query.database
  const host = req.query.host
  const port = req.query.port
  const table = req.query.table
  await philsysTable(user,password,database,host,port,table).then((data) => {
    res.json(data);
  })
})

const philsysTable = async (user,password,database,host,port,table) => {
  const client = new Client({
    user: user,
    password: password,
    database: database,
    host: host,
    port: port
  })
  var philsys = [];
  return loop = new Promise(async (resolve, reject) => {
    client.connect();
    client.query(`SELECT * from ${table}`, (err,result)=>{
      if (err){
        // return console.log(err);
      } resolve()
      philsys.push(result.rows)
      client.end();
    })
  }).then(() => {
    philsys=JSON.parse(JSON.stringify(philsys))
    return philsys
  }).then(()=>{
    router.post('/',function(req,res){
      philsys[0].forEach((key)=>{
        tableList.forEach((tabL)=>{
          res = table.includes(tabL)
          if (res === true){
            let sch = tabL
          }
        })
        const newphilData = new philsysmalolos(key)
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