const axios = require("axios");

const paystack = axios.create({
    baseURL: process.env.PAYSTACK_URL,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  })

const initialize = async function (req, res) {
    const {email, amount} = req.body;
    console.log(email, amount) 
  
    try {
      const paystackResponse = await paystack.get('/transaction/initialize', {
        email,
        amount: `${amount*100}`
      });
      if(paystackResponse.data) return res.json(paystackResponse.data)
  
    } catch (error) {
      return res.status(error.status).send(error)
    }
  };

  const verify =  async function (req, res){
    const {reference} = req.params
  
    try {
      const referenceResponse = await paystack.get(`/transaction/verify/${reference}`
      )
      if (referenceResponse.data) return res.json(referenceResponse.data)
      
    }catch (error) {
      return res.status(error.status).send(error)
    }
  };

  const listTransactions = async function (req, res){
   
    try {
      const list = await paystack.get(`/transaction`
      )
      if (list.data) return res.json(list.data)
      
    }catch (error) {
      return res.status(error.status).send(error)
    }
  };

  module.exports = {
    initialize,
    verify,
    listTransactions
  }