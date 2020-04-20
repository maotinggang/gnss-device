const knex = require("../../lib/mariadb");
const log = require("../../lib/log");
const string = require("lodash/string");
const collection = require("lodash/collection");
/* eslint-disable no-unused-vars */
exports.Real = class Real {
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
    // parse
    let dataJson;
    try {
      dataJson = JSON.parse(data);
    } catch (error) {
      log({
        level: "warn",
        code: "parse",
        call: "services.real.class.create",
        messsage: error.messsage,
        save: false,
      });
      return JSON.stringify({ data: "json.parse", seq: dataJson.seq || 0 });
    }
    if (!dataJson.id)
      return JSON.stringify({ data: "no.id", seq: dataJson.seq || 0 });

    const datas = string.split(dataJson.data, ";");
    if (!datas[0])
      return JSON.stringify({ data: "no.data", seq: dataJson.seq || 0 });

    let dataSave = [];
    collection.forEach(datas, async (value) => {
      const parameters = string.split(value, ",");
      if (parameters[0] == "$PB") {
        dataSave.push({
          id: dataJson.id,
          time: new Date(Number.parseInt(parameters[1])),
          lon: Number.parseFloat(parameters[2]),
          lat: Number.parseFloat(parameters[3]),
          alt: Number.parseFloat(parameters[4]),
          qual: parameters[5],
          sats: parameters[6],
          age: parameters[7],
        });
      } else if (parameters[0] == "$PE") {
        dataSave.push({
          id: dataJson.id,
          time: new Date(Number.parseInt(parameters[1])),
          lon: Number.parseFloat(parameters[2]),
          lat: Number.parseFloat(parameters[3]),
          alt: Number.parseFloat(parameters[4]),
          qual: parameters[5],
          sats: parameters[6],
          age: parameters[7],
          hdop: Number.parseFloat(parameters[8]),
          speed: Number.parseFloat(parameters[9]),
          track: Number.parseFloat(parameters[10]),
        });
      }
    });
    // save
    try {
      await knex("data").insert(dataSave);
    } catch (error) {
      log({
        level: "error",
        code: "mariadb",
        call: "services.real.class.create",
        messsage: error.messsage,
        save: false,
      });
      return JSON.stringify({ data: "mariadb", seq: dataJson.seq || 0 });
    }
    return JSON.stringify({ data: "success", seq: dataJson.seq || 0 });
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
