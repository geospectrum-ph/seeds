// Property of: Geospectrum Analytics Services, Inc.
// SEEDS Program
// Server File

// Packages Used
const express = require('express'); // for HTTP requests
const mongoose = require('mongoose'); // for Object Document Modelling
const bodyParser = require('body-parser');
const path = require('path');

var app = express();


// ADD THIS
var cors = require('cors');
app.use(cors());

const methodOverride = require('method-override');

require('dotenv').config();

// const app = express();
const port = process.env.PORT || 5000; // https://seeds.geospectrum.com.ph

// built-in & third-party middlewares
app.use(cors()); // CORS-enabled for all origins.
app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({limit: '1000mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true, parameterLimit:200000}))
app.use(bodyParser.json({limit: '1000mb'}))
app.use(methodOverride('_method'));

//MongoDB connection string
const uri = "mongodb+srv://seeds:seeds@seeds.nm1d8.mongodb.net/seeds-db?retryWrites=true&w=majority"
// const uri = "mongodb://127.0.0.1:27017/seeds-db" // mongodb conn string in localhost

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");

    // if(process.env.NODE_ENV === 'production'){
    //   app.use(express.static('client/build'));
    // }

    //import routes
    const userRouter = require('./routes/user');
    const userMasterRouter = require('./routes/user_master');
    const { db } = require('./models/user.model');
    const resetpassword = require("./routes/controllers/passwordReset");
    const resetpasswordmaster = require("./routes/controllers/passwordResetMaster");
    const personRouter = require('./routes/person');
    const buildingRouter = require('./routes/building');
    const barangayRouter = require('./routes/barangay');
    const cityRouter = require('./routes/city');
    const uploadRouter = require('./routes/upload');
    const metadataRouter = require('./routes/metadata');
    const getRouter = require('./routes/getdata');
    const healthmapperRouter = require('./routes/healthmapper');
    const jobmapperRouter = require('./routes/jobmapper');
    const commercialmapperRouter = require('./routes/commercialmapper');
    const landUseRouter = require('./routes/landuse');
    const analyticsRouter = require('./routes/analytics');
    const sessionRouter = require('./routes/session');

    const postgresqldbrouter = require('./routes/postgresqldb');
    const mysqlrouter = require('./routes/mysqldb');

    const householdRouter = require('./routes/household');
    const groupprivilege = require('./routes/group_privilege');
    const usergroup = require('./routes/user_group');
    const usergrouppermission = require('./routes/user_group_permission');

    const mobileRouter = require('./routes/mobile/mobile')


    app.use('/mysqldb', mysqlrouter);
    app.use('/postgresqldb', postgresqldbrouter);
    app.use('/person', personRouter);
    app.use('/building', buildingRouter);
    app.use('/barangay', barangayRouter);
    app.use('/city', cityRouter);
    app.use('/upload', uploadRouter);
    app.use('/metadata', metadataRouter);
    app.use('/getdata', getRouter);
    app.use('/healthmapper', healthmapperRouter);
    app.use('/jobmapper', jobmapperRouter);
    app.use('/commercialmapper', commercialmapperRouter);
    app.use('/landuse', landUseRouter);
    app.use('/analytics', analyticsRouter);
    app.use('/session', sessionRouter);
    app.use('/household', householdRouter);
    app.use('/user', userRouter);
    app.use('/usermaster', userMasterRouter);
    app.use('/resetpassword', resetpassword);
    app.use('/resetpasswordmaster', resetpasswordmaster);
    app.use('/groupprivilege', groupprivilege);
    app.use('/usergroup', usergroup);
    app.use('/usergrouppermission', usergrouppermission);
    app.use('/mobile', mobileRouter)

    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(error => console.log(error));