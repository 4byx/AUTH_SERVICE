const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

// const UserRepository = require("./repository/user-repository");
const app = express();
const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  // const userRepository = new UserRepository();
  // const user = await userRepository.getUserByEmail("jd@admin.com");
  // console.log(user);
  app.listen(PORT, async () => {
    console.log("Server started on port ", PORT);
  });
};
prepareAndStartServer();
