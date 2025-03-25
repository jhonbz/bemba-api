const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const User = require("./user")(sequelize, Sequelize);
const Session = require("./session")(sequelize, Sequelize);

module.exports = { sequelize, User ,Session};
