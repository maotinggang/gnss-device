// Initializes the `real` service on path `/real`
const { Real } = require('./real.class');
const hooks = require('./real.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/real', new Real(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('real');

  service.hooks(hooks);
};
