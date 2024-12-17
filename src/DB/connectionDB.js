import Sequelize from "sequelize";
export const sequelize = new Sequelize("assignment7", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const checkConecttionDB = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

export const checkSyncDB = () => {
  sequelize
    .sync({ alter: false, force: false })
    .then(() => {
      console.log("Connection sync has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to sync to the database:", error);
    });
};
