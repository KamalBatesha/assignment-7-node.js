import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";

//  const productModel=sequelize.define("product",{
//   id:{
//     type:DataTypes.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true
//   },
//   name:{
//     type:DataTypes.CHAR,
//     allowNull:false,
 
//   },isDeleted:{
//     type:DataTypes.BOOLEAN,
//     defaultValue:false,
//     allowNull:false,
    
//   },
// price:{
//   type:DataTypes.DECIMAL,
//   allowNull:false,
// },

// })
const productModel = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
},{
  paranoid: true
});
// productModel.belongsTo(userModel);
// userModel.hasMany(productModel)
export default productModel;