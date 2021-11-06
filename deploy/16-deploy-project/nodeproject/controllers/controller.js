const autoBind = require('auto-bind');

class Controller{
    constructor(){
        autoBind(this);
    }

    error(message , status = 500){
        let err = new Error(message);
        err.status = status;
        throw err;
    }
}

module.exports = Controller;
