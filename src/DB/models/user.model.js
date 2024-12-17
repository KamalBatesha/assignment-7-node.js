import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

//  const userModel=sequelize.define("user",{
//   id:{
//     type:DataTypes.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true
//   },
//   firstName:{
//     type:DataTypes.CHAR,
//     allowNull:false,
//     validate:{
//       len:[3,10]
//     }
//   },lastName:{
//     type:DataTypes.CHAR,
//     allowNull:false,
//     validate:{
//       len:[3,10]
//     }
//   },
// email:{
//   type:DataTypes.CHAR,
//   allowNull:false,
//   unique:true,
//   validate:{
//     isEmail:true
//   }
// },
// role:{
//   type:DataTypes.CHAR,
//   allowNull:false,

// },
// password:{
//   type:DataTypes.CHAR,
//   allowNull:false,
 
// },
// })
const userModel = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default userModel;