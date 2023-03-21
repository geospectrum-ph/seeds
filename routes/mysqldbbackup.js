const {createPool} = require("mysql")
var router = require('express').Router();

let philsysmalolos = require('../models/philsysmodel');

router.route('/philsysmysqlTable').get(async (req, res) => {
  const user = req.query.user
  const password = req.query.password
  const database = req.query.database
  const host = req.query.host
  const connectionLimit = req.query.connectionLimit
  const table = req.query.table
  await philsysTable(user,password,database,host,connectionLimit,table).then((data) => {
    res.json('Database Access Successful');
  })
})

const philsysTable = async (user,password,database,host,connectionLimit) => {
  const pool = createPool({
    user: user,
    password: password,
    database: database,
    host: host,
    connectionLimit: connectionLimit
  })

  router.route('/tableColumns').get(async (req, res) => {
    const Serial_number = req.query.Serial_number
    const Shape_Area = req.query.Shape_Area
    const Address = req.query.Address
    const Use = req.query.Use
    const Storeys = req.query.Storeys
    const Type = req.query.Type
    const No_Members = req.query.No_Members
    const Name = req.query.Name
    const Gender = req.query.Gender
    const Age = req.query.Age
    const Birthday = req.query.Birthday
    const Head = req.query.Head
    const Occupation = req.query.Occupation
    const Profession = req.query.Profession
    const Table = req.query.Table
    await tableColumns(Table,Serial_number,Shape_Area,Address,Storeys,Type,No_Members,Name,Gender,Age,Birthday,Head,Occupation,Profession).then((data) => {
      res.json('Database Access Successful');
    })
  })
  
  const tableColumns = async (Table,Serial_number,Shape_Area,Address,Storeys,Type,No_Members,Name,Gender,Age,Birthday,Head,Occupation,Profession) => {
    var philsys = []
    return loop = new Promise(async (resolve, reject) => {
      pool.query(`SELECT ${Serial_number},${Shape_Area},${Address},${Storeys},${Type},${No_Members},${Name},${Gender},${Age},${Birthday},${Head},${Occupation},${Profession} from ${Table}`, (err,result, fields)=>{
        if (err){
          return console.log(err);
        } resolve()
        philsys.push(result)
      })
    }).then(() => {
      philsys=JSON.parse(JSON.stringify(philsys))
      return philsys
    }).then(()=>{
      router.post('/',function(req,res){
        philsys[0].forEach((key)=>{
          const newphilData = new philsysmalolos(key)
          newphilData.save().then(() => res.json('PhilSYS DATA ADDED.'))
          .catch((error) => {
            assert.isNotOk(error,'Promise error');
            done();
          })
        })
      })
    }
  )}
}

module.exports = router