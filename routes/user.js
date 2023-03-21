// 8 Sept 2021
// Source: https://medium.com/swlh/user-authentication-using-mern-stack-part-1-backend-cd4d193f15b1
const express = require('express');
const router = express.Router();

const { signup, signin, getUsers, editUser,deleteUser } = require('./controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getusers', getUsers);
router.post('/edituser/:id', editUser);
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;