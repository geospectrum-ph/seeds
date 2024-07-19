// Source: https://medium.com/swlh/user-authentication-using-mern-stack-part-1-backend-cd4d193f15b1
const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createJWT } = require("../utils/auth");
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation, user_type } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" }); 
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (!user_type){
    errors.push({ user_type: "user_type required!"})
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
 User.findOne({email: email})
  .then(user=>{
    if(user){
      return res.status(422).json({ errors: [{ user: "email already exists" }] });
    } else {
      const user = new User({
        name: name,
        email: email,
        password: password,
        user_type: user_type
      });
      bcrypt.genSalt(10, function(err, salt) { 
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) throw err;
          user.password = hash;
          user.save()
            .then(response => {
              res.status(200).json({
                success: true,
                result: response
              })
            }).catch(err => {
              res.status(500).json({
                  errors: [{ error: err }]
              });
            });
         });
      });
    }
  }).catch(err =>{
    res.status(500).json({
      errors: [{ error: 'Something went wrong: ' + err }]
    });
  })
}

exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
  return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({
        errors: [{ user: "not found" }],
      });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json({ errors: [{ password: "incorrect" }] });
        }
        let access_token = createJWT( // dito nagkakaproblema
          user.email,
          user._id,
          '15s'
        );
        jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
          if (err) {
            res.status(500).json({ erros: err });
          } if (decoded) {
            // console.log('decoded!')
            return res.status(200).json({
              success: true,
              token: access_token,
              message: user
            });
          }
        });
      }).catch(err => {
        res.status(500).json({ erros: err });
      });
    }
  }).catch(err => {
    res.status(500).json({ erros: err });
  });
}

exports.getUsers = (req, res) => {
  var user_type = req.query.user_type || null
  var query = {}
  if(user_type){
    query.user_type = {$in: user_type}
  }

  User.find(query)
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
}

exports.editUser = (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    user.name = req.body.name;
    user.email = req.body.email;
    user.user_type = req.body.user_type;
    user.save()
      .then(() => res.json('User updated!'))
      .catch(err => res.status(400).json('Error: '+ err));
  })
}

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
}