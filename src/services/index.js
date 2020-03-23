const logSystem = require('./log/system/system.service.js');
const real = require('./real/real.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(logSystem);
  app.configure(real);
};
