

const logSystem = require('../../hooks/log-system');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [logSystem()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
