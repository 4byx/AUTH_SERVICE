const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something wrong at service layer");
      throw { error };
    }
  }

  async signIn(data) {
    try {
      const { email, plainPassword } = data;
      // console.log(email);
      // step 1 - database se data uthao
      const user = await this.userRepository.getUserByEmail(email);
      // check kro ki valid user hai ya nahi
      const matched = this.comparePassword(plainPassword, user.password);
      // token create kro uske liye
      if (!matched) {
        console.log("password does not match");
        throw { error: "Incorrect password" };
      }

      const newJWT = this.createToken({ email: user.email, id: user.id });
      console.log(this.verifyToken(newJWT));
      return newJWT;
    } catch (error) {
      console.log("something wrong in sign in process in service layer");
      throw { error };
    }
  }

  // these functions are usefull for signing in but before creating controller for signing in
  // we have to also create the the middle ware for userAuth
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something wrong in verifying token");
      throw { error };
    }
  }

  // this is for creating token when signed in
  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return token;
    } catch (error) {
      console.log("something wrong in creating token in service layer");
      throw { error };
    }
  }

  // this is for comparing password when signing in
  comparePassword(plainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
      console.log("something wrong in comparing password in service layer");
      throw { error };
    }
  }
}

module.exports = UserService;
