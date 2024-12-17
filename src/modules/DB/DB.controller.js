import { Router } from "express";
import { createTables} from "./DB.service.js";

export const DBRouter = new Router();
DBRouter.get("/create-tables", createTables);
