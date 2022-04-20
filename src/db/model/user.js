import { DataTypes, Model } from "sequelize/types";
import { sequelizeConnection } from "../config";
import Course from "./courses";

class User extends Model {
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

User.hasMany(Course);

export default User;
