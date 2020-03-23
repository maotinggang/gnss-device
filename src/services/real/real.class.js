const { Service } = require('feathers-knex');

exports.Real = class Real extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'real'
    });
  }
};
