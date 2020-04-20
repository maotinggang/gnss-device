const assert = require('assert');
const app = require('../../src/app');

describe('\'log-system\' service', () => {
  it('registered the service', () => {
    const service = app.service('log-system');

    assert.ok(service, 'Registered the service');
  });
});
