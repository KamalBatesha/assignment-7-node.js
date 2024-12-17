import { Router } from "express";
import { alterUserTable, login, signup, truncateProductsTable} from "./user.service.js";

export const userRouter = new Router();


userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/alter-table", alterUserTable);
userRouter.post('/truncate-table', truncateProductsTable);
