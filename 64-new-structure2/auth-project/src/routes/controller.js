const autoBind = require("auto-bind");

module.exports = class {
  constructor() {
    autoBind(this);
  }
}; 
