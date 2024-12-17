import { sequelize } from "../connectionDB.js";
import Sequelize, { DataTypes } from "sequelize";
import userModel from "./user.model.js";
import productModel from "./product.model.js";

// const ownModel = sequelize.define("own", {
//   userID: {
//     type: Sequelize.INTEGER,
//     allowNull:false,
//     foreignKey:true
//   },

//   productID:{
//     type:Sequelize.INTEGER,
//     allowNull:false,
//     primaryKey:true,
//     foreignKey: true,
//   }
// });


// userModel.hasMany(ownModel,{
//   foreignKey: "userID",
//   sourceKey: "id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
//   allowNull: false,
// })
// productModel.hasOne(ownModel,{
//   foreignKey: "productID",
//   sourceKey: "id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
//   allowNull: false,
// })
const ownModel = sequelize.define('own', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: 'id'
    },
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: productModel,
      key: 'id'
    },
    allowNull: false
  }
});

// العلاقة بين الجداول
userModel.belongsToMany(productModel, { through: ownModel, foreignKey: 'userId' });
productModel.belongsToMany(userModel, { through: ownModel, foreignKey: 'productId' });
export default ownModel;
