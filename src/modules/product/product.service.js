import { Op, Sequelize } from "sequelize";
import productModel from "../../DB/models/product.model.js";
import userModel from "../../DB/models/user.model.js";
import ownModel from "../../DB/models/own.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, stock, price } = req.body;

    await productModel.create({
      name,
      stock,
      price,
    });

    return res.status(200).json({ message: "product added" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Error in product added", error });
  }
};

export const deleteProductSoft = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isDeleted = true;

    await product.destroy();

    return res.status(200).json({
      message: "Product marked as deleted successfully",
      product: {
        id: product.id,
        name: product.name,
        isDeleted: product.isDeleted,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while trying to delete the product" });
  }
};

export const deleteProductHard = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy({ force: true });

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while trying to delete the product" });
  }
};

export const search = async (req, res) => {
  const searchTerm = req.query.name;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ error: "Please provide a 'name' query parameter" });
  }

  try {
    const products = await productModel.findAll({
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the search term" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while searching for products" });
  }
};
export const searchById = async (req, res) => {
  const ids = req.query.ids;

  if (!ids) {
    return res
      .status(400)
      .json({ error: "Please provide an 'ids' query parameter" });
  }

  const idArray = ids.split(",").map((id) => parseInt(id));

  try {
    const products = await productModel.findAll({
      where: {
        id: {
          [Op.in]: idArray,
        },
      },
      attributes: ["id", "name", "price"],
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the specified IDs" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.findAll({
      where: {
        deletedAt: null,
      },
      attributes: [
        [Sequelize.col("name"), "productName"], // Alias 'name' to 'productName'
        [Sequelize.col("price"), "cost"], // Alias 'price' to 'cost'
        "id", // Also return 'id'
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

export const productsWithUsers = async (req, res) => {
    try {
        const own = await ownModel.findAll({
          attributes: [
            "userId",
            "productId", 
          ],
          include: [
            {
              model: productModel,  // Product model
              as: "product",  // Alias for the product model
              attributes: [[Sequelize.col("name"), "productName"]], // Alias the product's name
            },
            {
              model: userModel,  // User model
              as: "user",  // Alias for the user model
              attributes: [[Sequelize.col("email"), "userEmail"]], // Alias the user's email
            },
          ],
        });
    
        // If no products are found, return a message
        if (own.length === 0) {
          return res.status(404).json({ message: "No products found" });
        }
    
        // Map the results to the desired format
        const result = own.map((item) => ({
          productName: item.product.productName, // Access aliased product name
          userEmail: item.user.userEmail, // Access aliased user email
        }));
    
        // Return the list of products with their corresponding user's email
        return res.status(200).json(result);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching products with users" });
      }
};

export const maxPrice = async (req, res) => {
    try {
        // Find the product with the maximum price using Sequelize
        const maxPrice = await productModel.max('price'); // 'price' is the field we're calculating the max for
    
        // If no products are found, return a message
        if (maxPrice === null) {
          return res.status(404).json({ message: "No products found" });
        }
    
        // Return the maximum price
        return res.status(200).json({ maxPrice });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the maximum price' });
      }
};

export const getTopExpensiveProducts = async (req, res) => {
    try {
      const products = await productModel.findAll({
        attributes: ['name', 'price'],  
        order: [['price', 'DESC']],    
        limit: 5,                     
      });
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
  
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "An error occurred while fetching top expensive products",
      });
    }
  };