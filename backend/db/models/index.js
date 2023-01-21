const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("db", null, null, {
  dialect: "sqlite",
  logging: false,
  storage: path.join(__dirname, "..", "db.sqlite3"),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userInstance = require("./userInstance")(sequelize, Sequelize);

sequelize.sync();

module.exports = db;