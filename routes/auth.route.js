
const express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// create a new account
router.post('/register', authController.register);
 //log in to the account
router.post('/login', authController.login);

 


  module.exports = router;