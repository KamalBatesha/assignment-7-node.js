import ownModel from "../../DB/models/own.model.js";
import phoneModel from "../../DB/models/phone.model.js";
import productModel from "../../DB/models/product.model.js";
import userModel from "../../DB/models/user.model.js";

export const createTables = async (req, res) => {
  const user = userModel.findOne();
  const product = productModel.findOne();
  const phone = phoneModel.findOne();
  const own = ownModel.findOne();
  res.status(200).json({ msg: "table created successfully" });
};

