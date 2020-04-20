const collection = require("lodash/collection");
const SERVER = "gnss-core";
// for all server
const base = ({ name, script }) => {
  name = SERVER ? `${SERVER}_${name}` : name;
  return {
    name: name,
    script: script,
    node_args: "--max_semi_space_size=64 --max-old-space-size=4096",
    restart_delay: 3000,
    kill_timeout: 3000,
    instances: 1,
    exec_mode: "cluster",
    autorestart: true,
    watch: false,
    ignore_watch: ["node_modules"],
    max_memory_restart: "500M",
    error_file: `./logs/${name}/error.log`,
    out_file: `./logs/${name}/out.log`,
    time: true,
    env: {
      NODE_ENV: "development",
      NAME: `${name}_dev`,
    },
    env_production: {
      NODE_ENV: "production",
      NAME: name,
      // mariadb
      MARIADB: JSON.stringify({
        client: "mysql2",
        connection: {
          host: "localhost",
          user: "disaster",
          password: "disaster@dazhou",
          database: "disaster",
        },
        pool: { min: 1, max: 10 },
      }),
    },
  };
};

const general = ({ name, script, instances = 1, others = [] }) => {
  let config = base({ name, script });
  config.instances = instances;
  collection.forEach(others, ({ name, value }) => {
    config.env_production[name] = value;
  });
  return config;
};

module.exports = {
  apps: [
    general({
      name: "http",
      script: "src",
      others: [
        {
          name: "INTERVAL",
          value: 1,
        },
      ],
    }),
  ],
};
