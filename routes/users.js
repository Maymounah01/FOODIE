var express = require('express');
var router = express.Router();
const axios = require("axios");
const paystackController = require('../controllers/paystack.controller')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// initialize transaction
router.post('/initialize',paystackController.initialize);

//verify transaction
router.get("/verify/:reference",paystackController.verify);

//list all transactions
router.get("/listTransactions",paystackController.listTransactions);
 
module.exports = router;
