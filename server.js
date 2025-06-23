const express = require("express");

const app = express();

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true, parameterLimit: 200000 }));
app.use(bodyParser.json({limit: "1000mb"}));

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

const cors = require("cors");

app.use(cors());

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongodb_connection_string = "mongodb+srv://seeds:seeds@seeds.nm1d8.mongodb.net/seeds-db?retryWrites=true&w=majority"
// const mongodb_connection_string = "mongodb://127.0.0.1:27017/seeds-db"

require("dotenv").config();

const port = process.env.PORT || 5000; // https://seeds.geospectrum.com.ph

const path = require("path");

mongoose
  .connect(process.env.MONGODB_URI || mongodb_connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");

    const analyticsRouter = require("./routes/analytics");
    const barangayRouter = require("./routes/barangay");
    const buildingRouter = require("./routes/building");
    const cityRouter = require("./routes/city");
    const commercialmapperRouter = require("./routes/commercialmapper");
    const getRouter = require("./routes/getdata");
    const groupprivilege = require("./routes/group_privilege");
    const healthmapperRouter = require("./routes/healthmapper");
    const householdRouter = require("./routes/household");
    const jobmapperRouter = require("./routes/jobmapper");
    const landUseRouter = require("./routes/landuse");
    const metadataRouter = require("./routes/metadata");
    const mobileRouter = require("./routes/mobile");
    const mysqlrouter = require("./routes/mysqldb");
    const personRouter = require("./routes/person");
    const postgresqldbrouter = require("./routes/postgresqldb");
    const resetpassword = require("./routes/controllers/passwordReset");
    const resetpasswordmaster = require("./routes/controllers/passwordResetMaster");
    const sessionRouter = require("./routes/session");
    const uploadRouter = require("./routes/upload");
    const userRouter = require("./routes/user");
    const usergroup = require("./routes/user_group");
    const usergrouppermission = require("./routes/user_group_permission");
    const userMasterRouter = require("./routes/user_master");

    app.use("/analytics", analyticsRouter);
    app.use("/barangay", barangayRouter);
    app.use("/building", buildingRouter);
    app.use("/city", cityRouter);
    app.use("/commercialmapper", commercialmapperRouter);
    app.use("/getdata", getRouter);
    app.use("/groupprivilege", groupprivilege);
    app.use("/healthmapper", healthmapperRouter);
    app.use("/household", householdRouter);
    app.use("/jobmapper", jobmapperRouter);
    app.use("/landuse", landUseRouter);
    app.use("/metadata", metadataRouter);
    app.use("/mobile", mobileRouter);
    app.use("/mysqldb", mysqlrouter);
    app.use("/person", personRouter);
    app.use("/postgresqldb", postgresqldbrouter);
    app.use("/resetpassword", resetpassword);
    app.use("/resetpasswordmaster", resetpasswordmaster);
    app.use("/session", sessionRouter);
    app.use("/upload", uploadRouter);
    app.use("/user", userRouter);
    app.use("/usergroup", usergroup);
    app.use("/usergrouppermission", usergrouppermission);
    app.use("/usermaster", userMasterRouter);

    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (request, response) => {
      response.sendFile(path.join(__dirname, "/client/build/index.html"));
    });

    app.listen(port, () => {
        console.log(`The server is running on port: ${port}`);
    });
  })
  .catch(error => console.log(error));