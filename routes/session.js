// 8 Sept 2021
const express = require('express');
const router = express.Router();

const multer = require("multer") // Package used for handling storage locally
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');

let Session = require('../models/sessions.model')
let File = require('../models/sessionfile.model')

// create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        // In here you have access to the request and also to the body object
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
  
// Initialize Local Storage in remote directory
const localstorage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  // limits:{fileSize: 100000000},
});

const localupload = multer({
  storage: localstorage,
  // limits:{fileSize: 100000000},
});

const updateJson = async (oldJson, updateJson) => {
  if (updateJson) {
    var jsonOut = JSON.parse(JSON.stringify(oldJson)) // deep copy
    var keys = Object.keys(updateJson)
    return loop = new Promise((resolve, reject) => {
      var c = 0 
      keys.forEach(key => {
        jsonOut[key] = updateJson[key] // update each entry
        c += 1
        if(c === keys.length){
          resolve()
        }
      })   
    }).then(() => {
      return jsonOut;
    })
  } else {
    return oldJson;
  }
}

const editSession = async (userId, populate, catalogue, map, profile, analytics) => {
  const query = {userId: userId}
  try {
    var session = await Session.findOne(query)
    if (session){ // session exists
      var updateSessions = new Promise((resolve, reject) => {
        var c = 0
        updateJson(session.populate, populate).then((out) => {
          session.populate = out
          if (c === 2){
            session.save();
            resolve()
            // return session
          } else {
            c+=1
          }
        })
        updateJson(session.catalogue, catalogue).then((out) => {
          session.catalogue = out
          if (c === 2){
            session.save();
            resolve()
            // return session
          } else {
            c+=1
          }
        })
        updateJson(session.map, map).then((out) => {
          session.map = out
          if (c === 2){
            session.save();
            resolve()
            // return session
          } else {
            c+=1
          }
        })
        updateJson(session.profile, profile).then((out) => {
          session.profile = out
          if (c === 2){
            // session.save();
            resolve()
            // return session
          } else {
            c+=1
          }
        })
        updateJson(session.analytics, analytics).then((out) => {
          session.analytics = out
          if (c === 2){
            // session.save();
            resolve()
            // return session
          } else {
            c+=1
          }
        })
      })
      await updateSessions().then(() => {
        // out.save()
        return "session edited"
      })           
      // session.save();
    } else { // session doesn't exist 
      return 
    }
  } catch (err) {
    return 
  }
}

const createSession = async (userId, populate, catalogue, map, profile, analytics) => {
  const query = {'userId': userId}
  try {
    var session = await Session.findOne(query)
    var message = {
      "status": "failed",
      "message": "an unknown error has occured"
    }
    if (session){ // if session exists
      message.message = 'session already exists'
      return message;
    } else { // if session doesn't exist
      session = new Session({ // create session
        userId: userId,
        populate: populate,
        catalogue: catalogue,
        map: map,
        profile: profile,
        analytics: analytics
      })
      session.save() // save session
      message.status = 'success'
      message.message = 'Session successfully saved. userId: ' + userId
      return(message)
    }
  } catch (err){
    message.message = err.message
    return message;
  }
}

router.route('/create').post(async (req, res) => { 
  var userId, map, profile, analytics
  userId = req.body.userId;
  populate = req.body.populate;
  catalogue = req.body.catalogue;
  map = req.body.map;
  profile = req.body.profile;
  analytics = req.body.analytics

  var result = await createSession(userId, populate, catalogue, map, profile, analytics)
  .then((out) => {
    res.json(out)
  });
});

router.route('/get').get(async (req, res) => { 
  const query = {userId: req.query.userId};
  try {
    Session.findOne(query).then((out) => {res.json(out)}) 
  } catch (err) {
    return null
  }
});

router.route('/edit').post(async (req, res) => { 
  var userId, populate, catalogue, map, profile, analytics
  userId = req.body.userId;
  populate = req.body.populate;
  catalogue = req.body.catalogue;
  map = req.body.map;
  profile = req.body.profile;
  analytics = req.body.analytics

  var result = await editSession(userId, populate, catalogue, map, profile, analytics)
  .then((out) => {
    res.json(out)
  });

});

router.route('/upload').post(upload.single('file'), (req, res, next) => {
    // check for existing images
  File.findOne({ filename: req.file.filename }).then((image) => {
    if (image) {
      return res.status(200).json({
        success: false,
        message: 'File already saved',
      });
    }
    let newImage = new File({
      userId: req.body.userId,
      filename: req.body.filename,
      fileId: req.body.id,
    });
    newImage.save().then((image) => {
      res.status(200).json({
        success: true,
        image,
      });
    }).catch(err => res.status(500).json(err));
  }).catch(err => res.status(500).json(err));
}).get((req, res, next) => {
  File.find({})
    .then(images => {
      res.status(200).json({
        success: true,
        images,
      });
    }).catch(err => res.status(500).json(err));
});

router.route('/file/:filename').get((req, res, next) => {
  File.find({ userId: req.params.filename }).then(images => {
    res.status(200).json({
      success: true,
      file: images[0],
    });
  }).catch(err => res.status(500).json(err));
});        

module.exports = router;