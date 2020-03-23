// Initializes the `log/system` service on path `/log/system`
const { System } = require('./system.class');
const createModel = require('../../../models/system.model');
const hooks = require('./system.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/log/system', new System(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('log/system');

  service.hooks(hooks);
};
