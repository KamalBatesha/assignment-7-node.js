import { DataTypes } from "sequelize";
import phoneModel from "../../DB/models/phone.model.js";
import userModel from "../../DB/models/user.model.js";
import { checkEmailExsist } from "../../utils/checkEmail.js";
import { sequelize } from "../../DB/connectionDB.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    checkEmailExsist(email, res);

    const user = await userModel.create({
      email,
      role,
      password,
      firstName,
      lastName,
    });
    phone.forEach(async (element) => {
      await phoneModel.create({
        type: element.type,
        number: element.number,
        userId: user.id,
      });
    });

    return res.json({ message: "Email added sucessfuly" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ msg: "Error in signup", error });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (password !=user.password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};


export const alterUserTable = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findByPk(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can alter the table' });
    }

    await sequelize.queryInterface.addColumn('users', 'createdAt', {
      type:DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    });

    return res.json({ message: 'Table altered successfully. createdAt column added.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error altering table', error });
  }
};

export const truncateProductsTable = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findByPk(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can perform this operation' });
    }

    await productModel.destroy({
      where: {}, 
    });

    return res.json({ message: 'All products have been removed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error truncating the products table', error });
  }
};