const { Sequelize } = require("sequelize");

const dbName = "schedule_courses";
const dbUser = "ismael";
const dbHost = "127.0.0.1";
const dbDriver = "mysql";
const dbPassword = "admin";

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  define: { freezeTableName: true },
});

sequelizeConnection
  .sync()
  .then(() => {
    console.log("db connected ");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelizeConnection;
