const { Sequelize } = require("sequelize");

const mysql = require("mysql2");

const dbName = "schedule_courses";
const dbUser = "ismael";
const dbHost = "localhost";
const dbDriver = "mysql";
const dbPassword = "admin";

module.exports = sequelizeConnection = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: dbDriver,
  }
);

sequelizeConnection.sync().then(() => {
  console.log("db connected ");
});
