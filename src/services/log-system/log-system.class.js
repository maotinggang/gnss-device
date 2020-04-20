const log = require("../../lib/log");
/* eslint-disable no-unused-vars */
exports.LogSystem = class LogSystem {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }
    log({
      level: "warn",
      code: "system",
      call: "services.log-system.class.create",
      messsage: data,
      save: false,
    });
    return "OK";
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
