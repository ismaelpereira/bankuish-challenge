import { DataTypes, Model } from "sequelize/types";
import User from "./user";

class Course extends Model {
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

Course.belongsToMany(User);

export default Course;
