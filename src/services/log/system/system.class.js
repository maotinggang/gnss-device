const { Service } = require('feathers-knex');

exports.System = class System extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'system'
    });
  }
};
