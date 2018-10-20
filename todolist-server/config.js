const dotenv = require("dotenv");
 // Load environment variables from .env file
dotenv.config();
 const env = process.env.NODE_ENV || "development";
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || "sample-api",
    host: process.env.APP_HOST || "0.0.0.0",
    port: process.env.APP_PORT || 3000,
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  development: {
    database: {
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT_DEV,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  }
};
 module.exports = {
  ...configs.base,
  ...configs[env],
}; 