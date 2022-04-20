const { DataTypes, Sequelize } = require("sequelize");
const sequelizeConnection = require("../config");
const User = require("./user");

class Course extends Sequelize.Model {
  id;
  name;
  requiredCourse;
}

Course.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    requiredCourse: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: sequelizeConnection }
);

module.exports = Course;
