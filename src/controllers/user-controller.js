const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created the user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json({
      success: false,
      message: "Not able to create the user",
      data: [],
      err: error,
    });
  }
};

module.exports = {
  create,
};
