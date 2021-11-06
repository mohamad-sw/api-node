let controller = require("./controller");
const User = require("./../models/user");
const Payment = require("./../models/payment");
const axios = require('axios');


const { validationResult } = require("express-validator");

module.exports = new class dashboardController extends controller {
  async paycallback(req, res, next) {
    try {
      // if(req.query.Status  && req.query.Status !== "OK"){
      //   return res.send('تراکنش ناموفق');
      // }
      let payment = await Payment.findOne({resnumber : req.query.Authority});
      if(!payment) return res.send('همچین تراکنشی وجود ندارد');
      let params = {
        MerchantID: "6cded376-3063-11e9-a98e-005056a205be" ,
        Amount: payment.amount ,
        Authority: req.query.Authority,
      };

      const response = await axios.post( "https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json" , params);
      if(response.data.Status != 100){
        let balance = payment.amount;
        let user = await User.findById(payment.user);
        if(user.balance){
          balance += user.balance;
        }
        user.balance = balance;
        payment.payment = true;
        await user.save();
        await payment.save();
        res.redirect('/dashboard');

      }else{
        return res.send('تراکنش ناموفق');
      }


    } catch (err) {
      next(err);
    }
  }



}


