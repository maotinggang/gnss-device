// Initializes the `real` service on path `/real`
const { Real } = require('./real.class');
const createModel = require('../../models/real.model');
const hooks = require('./real.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/real', new Real(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('real');

  service.hooks(hooks);
};
