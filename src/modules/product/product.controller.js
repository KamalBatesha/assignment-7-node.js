import { Router } from "express";
import { addProduct,deleteProductSoft,deleteProductHard,search, searchById,getAllProducts, productsWithUsers, maxPrice, getTopExpensiveProducts} from "./product.service.js";

export const productRouter = new Router();


productRouter.post("/", addProduct);
productRouter.patch("/soft-delete/:id", deleteProductSoft);
productRouter.delete("/:id", deleteProductHard);
productRouter.get('/search', search);
productRouter.get('/in', searchById);
productRouter.get('/', getAllProducts);
productRouter.get('/products-with-users', productsWithUsers);
productRouter.get('/max-price', maxPrice);
productRouter.get('/top-expensive', getTopExpensiveProducts);

