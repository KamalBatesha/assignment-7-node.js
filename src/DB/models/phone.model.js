import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";

// const phoneModel = sequelize.define("phone", {
//   phone: {
//     type: DataTypes.CHAR,
//     allowNull: false,
//     primaryKey: true,
//   },

// });

// phoneModel.belongsTo(userModel, {
//   foreignKey: "userID",
//   sourceKey: "id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
//   allowNull: false,
// });
// userModel.hasMany(phoneModel)

const phoneModel = sequelize.define('phone', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false, // مثل homePhone أو mobilePhone
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: 'id'
    }
  }
});

export default phoneModel;