const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

// const { User, Role } = require("./models/index");

// const db = require("./models/index");

// const UserRepository = require("./repository/user-repository");
const app = express();
const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  // const u1 = await User.findByPk(1);
  // const r1 = await Role.findByPk(2);
  // u1.addRole(r1);
  // console.log(await u1.hasRole(r1));
  // if (DB_SYNC === 1) {
  //   db.sequelize.sync({ alter: true });
  // }

  // const userRepository = new UserRepository();
  // const user = await userRepository.getUserByEmail("jd@admin.com");
  // console.log(user);
  app.listen(PORT, async () => {
    console.log("Server started on port ", PORT);
  });
};
prepareAndStartServer();
