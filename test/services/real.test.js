const assert = require('assert');
const app = require('../../src/app');

describe('\'real\' service', () => {
  it('registered the service', () => {
    const service = app.service('real');

    assert.ok(service, 'Registered the service');
  });
});
