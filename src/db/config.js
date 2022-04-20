import { Sequelize } from "sequelize/types";

const sqlite3 = require("sqlite3");

const dbName = "schedule_courses";
const dbUser = "ismaelpereira";
const dbHost = "localhost";
const dbDriver = sqlite3;

const dbPassword = "root";

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

sequelizeConnection.sync().then(() => {
  console.log("db connected ");
});
