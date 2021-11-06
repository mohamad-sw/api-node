const validator = require('./validator');
const { check } = require("express-validator");
const path = require('path');

module.exports = new class UserValidator extends validator {
    handle(){
        return  [
            check("name", "نام نمیتواند خالی باشد").not().isEmpty(),
            check("img", "وجود تصویر الزامیست").not().isEmpty(),
            check("img").custom(async value=>{
                if(!value){
                    return
                }
                if(!['.jpg','jpeg','.png'].includes(path.extname(value))){
                    throw new Error('پسوند فایل آپلود شده صحیح نیست')
                }
            })
          ]
    }
}
