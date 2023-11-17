const path = require("node:path");
const fastify = require("fastify")({ logger: false });
const AutoLoad = require("@fastify/autoload");
const mysql = require("@fastify/mysql");
require("dotenv").config();

// Register routes
fastify.register(AutoLoad, {
  dir: path.join(__dirname, "src/routes"),
});

// Register MySQL
fastify.register(mysql, {
  promise: true,
  connectionString: "mysql://root@localhost/rgg",
});

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  // Capture the MySQL instance
  mysqlInstance = fastify.mysql;
  console.log("MySQL instance captured");

  console.log("Server is running on port 3000");
});

module.exports = fastify;
