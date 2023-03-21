var router = require('express').Router();
var assert = require('assert');
var mysql = require( "mysql" );

let philsysmalolos = require('../models/philsysmodel');
let DiseaseSample = require('../models/disease');
let Employment_Barangay = require('../models/job-models/employment.barangay.model');

router.route('/mysqlCredentials').get(async (req, res) => {
  const user = req.query.user
  const password = req.query.password
  const database = req.query.database
  const host = req.query.host
  const connectionLimit = req.query.connectionLimit
  await philsysTable(user,password,database,host,connectionLimit).then((data) => {
    res.json('Database Access Successful');
  })
})


const philsysTable = async (user,password,database,host,connectionLimit) => {
  const pool = mysql.createConnection({
    user: user,
    password: password,
    database: database,
    host: host,
    connectionLimit: connectionLimit,
  })

  router.route('/tableSchema').get(async (req, res) => {
    const table = req.query.table
    const table1 = req.query.table1
    await schema(table,table1).then((data) => {
      res.json('Table Access Successful');
    })
  })

  const schema = async(table,table1) => {
    if(table == "Household"){
      router.route('/tableColumnsH').get(async (req, res) => {
        const Serial_number = req.query.Serial_number
        const Shape_Area = req.query.Shape_Area
        const Address = req.query.Address
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
        await tableColumnsH(Serial_number,Shape_Area,Address,Storeys,Type,No_Members,Name,
          Gender,Age,Birthday,Head,Occupation,Profession).then((data) => {
          res.json('Household Data Imported');
        })
      })
      const tableColumnsH = async (Serial_number,Shape_Area,Address,Storeys,Type,No_Members,Name,Gender,
        Age,Birthday,Head,Occupation,Profession) => {
        var PhilSYS = []
        return loop = new Promise(async (resolve, reject) => {
          if (Serial_number===""){
            Serial_number = null
          } if (Shape_Area===""){
            Shape_Area = null
          } if (Address===""){
            Address = null
          } if (Storeys===""){
            Storeys = null
          } if (Type===""){
            Type = null
          } if (No_Members===""){
            No_Members = null
          } if (Name===""){
            Name = null
          } if (Gender===""){
            Gender = null
          } if (Age===""){
            Age = null
          } if (Birthday===""){
            Birthday = null
          } if (Head===""){
            Head = null
          } if (Occupation===""){
            Occupation = null
          } if (Profession===""){
            Profession = null
          }
          // HOW TO PREVENT SQL INJECTION link: https://www.veracode.com/blog/secure-development/how-prevent-sql-injection-nodejs

          pool.query(`SELECT :q_serialNumber as Serial_number, :q_shapeArea as Shape_Area, :q_address as Address, :q_storeys as Storeys, :q_type as Type, :q_noMembers as No_Members, :q_name as Name, :q_gender as Gender, :q_age as Age, :q_birthday as Birthday, :q_head as Head, :q_occupation as Occupation, :q_profession as Profession from :q_table`,
          {
            q_serialNumber: Serial_number,
            q_shapeArea : Shape_Area,
            q_address: Address,
            q_storeys: Storeys,
            q_type: Type,
            q_noMembers: No_Members,
            q_name: Name,
            q_gender: Gender,
            q_age: Age,
            q_birthday: Birthday,
            q_head: Head,
            q_occupation: Occupation,
            q_profession: Profession,
            q_table: table1
          }, (err,result, fields)=>{
            if (err){
              return console.log(err);
            } resolve()
            PhilSYS.push(result)
          })
        }).then(() => {
            PhilSYS=JSON.parse(JSON.stringify(PhilSYS))
            return PhilSYS
        }).then(()=>{
          router.post('/postP',function(req,res){
            PhilSYS[0].forEach((k)=>{
              const newphilData = new philsysmalolos(k)
              newphilData.save()
              .then(() => res.json('Household DATA ADDED.'))
              .catch((error) => {
                assert.ok(error,'Promise error');
              })
            })
          })
        })
      }
    }///PHILSYS

    if(table == "Employment"){
      router.route('/tableColumnsE').get(async (req, res) => {
        const employment_id = req.query.employment_id
        const job_class = req.query.job_class
        const brgy_id = req.query.brgy_id
        const date = req.query.date
        const female = req.query.female
        const male = req.query.male
        const total = req.query.total
        const remarks = req.query.remarks
        await tableColumnsE(employment_id,job_class,brgy_id,date,female,male,total,remarks).then((data) => {
          res.json('Employment Data Imported');
        })
      })

      const tableColumnsE = async (employment_id,job_class,brgy_id,date,female,male,total,remarks) => {
        var Employment = []
        return loop = new Promise(async (resolve, reject) => {
          if (employment_id===""){
            employment_id = null
          } if (job_class===""){
            job_class = null
          } if (brgy_id===""){
            brgy_id = null
          } if (date===""){
            date = null
          } if (female===""){
            female = null
          } if (male===""){
            male = null
          } if (total===""){
            total = null
          } if (remarks===""){
            remarks = null
          }

          pool.query(`SELECT :q_employmentId as employment_id, :q_jobClass as job_class, :q_brgyId as brgy_id, :q_date as date, :q_female as female, :q_male as male, :q_total as total, :q_remarks as remarks from :q_table`,
          {
            q_employmentId: employment_id,
            q_jobClass: job_class,
            q_brgyId: brgy_id,
            q_date: date,
            q_female: female,
            q_male: male,
            q_total: total,
            q_remarks: remarks,
            q_table: table1
           }, (err,result, fields)=>{
            if (err){
              return console.log(err);
            } resolve()
            Employment.push(result)
          })
        }).then(() => {
          Employment=JSON.parse(JSON.stringify(Employment))
          return Employment
        }).then(()=>{
          router.post('/postE',function(req,res){
            Employment[0].forEach((k)=>{
              const newphilData = new Employment_Barangay(k)
              newphilData.save()
              .then(() => res.json('EMPLOYMENT DATA ADDED.'))
              .catch((error) => {
                assert.ok(error,'Promise error');
              })
            })
          })
        })
      }
    }///EMPLOYMENT

    if(table == "Disease"){
      router.route('/tableColumnsD').get(async (req, res) => { 
        const diseaseID = req.query.diseaseID
        const disease = req.query.disease
        const status = req.query.status
        const latitude = req.query.latitude
        const longitude = req.query.longitude
        const date = req.query.date
        const remarks = req.query.remarks
        await tableColumnsD(diseaseID,disease,status,latitude,longitude,date,remarks).then((data) => {
          res.json('Disease Data Imported');
        })
      })
      const tableColumnsD = async (diseaseID,disease,status,latitude,longitude,date,remarks) => {
      var DiseaseS = []
      return loop = new Promise(async (resolve, reject) => {
        if (diseaseID===""){
          diseaseID = null
        } if (disease===""){
          disease = null
        } if (status===""){
          status = null
        } if (latitude===""){
          latitude = null
        } if (longitude===""){
          longitude = null
        } if (date===""){
          date = null
        } if (remarks===""){
          remarks = null
        }

        pool.query(`SELECT :q_disease as disease, :q_status as status, :q_latitude as latitude, :q_longitude as longitude, :q_date as date, :q_remarks as remarks from :q_table where EXISTS (select * from :q_table)`,
        {
          q_disease: disease,
          q_status: status,
          q_latitude: latitude,
          q_longitude: longitude,
          q_date: date,
          q_remarks: remarks,
          q_table: table1
        }, (err,result, fields)=>{
          if (err){
            return console.log(err);
          } resolve()
          DiseaseS.push(result)
        })
        }).then(() => {
          DiseaseS=JSON.parse(JSON.stringify(DiseaseS))
          return DiseaseS
        }).then(()=>{
          router.post('/postD',function(req,res){
            DiseaseS[0].forEach((k)=>{
              const newphilData = new DiseaseSample(k)
              newphilData.save()
              .then(() => res.json('DISEASE DATA ADDED.'))
              .catch((error) => {
                assert.ok(error,'Promise error');
              })
            })
          })
        })
      }
    }///DISEASE
  }
}

module.exports = router