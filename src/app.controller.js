import { checkConecttionDB, checkSyncDB } from "./DB/connectionDB.js";
import { DBRouter } from "./modules/DB/DB.controller.js";
import { productRouter } from "./modules/product/product.controller.js";
import { userRouter } from "./modules/user/user.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  checkConecttionDB();
  checkSyncDB();
  app.use("/DB",DBRouter);
  app.use("/user",userRouter);
  app.use("/products",productRouter);

  app.use("*", (req, res, next) => {
    return res.status(404).json({ msg: `invalid url ${req.originalUrl}` });
  });
};

export default bootstrap;
