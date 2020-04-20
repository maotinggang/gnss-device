// Initializes the `log-system` service on path `/log-system`
const { LogSystem } = require('./log-system.class');
const hooks = require('./log-system.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/log-system', new LogSystem(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('log-system');

  service.hooks(hooks);
};
