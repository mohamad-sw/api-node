const controller = require('./../controller');
const _ = require('lodash');


module.exports = new (class extends controller {
  async dashboard(req, res){
   res.send('user dashboard')
  }

  async me(req, res){
   this.response({res,data: _.pick(req.user,["name", "email"])})
  }

})();

