const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  registerValidator(){
    return [
      check('email')
        .isEmail()
        .withMessage('email is invalid'),
      check('name')
        .not()
        .isEmpty()
        .withMessage('name cant be empty'),
      check('password')
        .not()
        .isEmpty()
        .withMessage('password cant be empty'),
    ]
  }

  loginValidator(){
    return [
      check('email')
        .isEmail()
        .withMessage('email is invalid'),
      check('password')
        .not()
        .isEmpty()
        .withMessage('password cant be empty'),
    ]
  }
}