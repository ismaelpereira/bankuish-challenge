const { DataTypes, Sequelize } = require("sequelize");
const { sequelizeConnection } = require("../config");

class User extends Sequelize.Model {
  id;
  name;
  email;
  coursesAlreadyMade;
  schedule;
  apiKey;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    coursesAlreadyMade: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    schedule: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    apiKey: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  { sequelize: sequelizeConnection }
);

module.exports = User;
