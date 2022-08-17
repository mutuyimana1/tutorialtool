import { body } from "express-validator";
import userInfos from "../models/users";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth";

class userController {
  //create user
  static async createUser(req, res) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPassword;
    const user = await userInfos.create(req.body);
    if (!user) {
      return res.status(404).json({ error: "create user failed" });
    }
    return res
      .status(200)
      .json({ message: "user created successfully", data: user });
  }
  //end of creating user

  //get all users

  static async getAllUsers(req, res) {
    const users = await userInfos.find();
    if (!users) {
      return res.status(404).json({ error: "users not found" });
    }
    return res
      .status(200)
      .json({ message: "users found successfully", data: users });
  }
  //--------------//

  //get one user

  static async getOneUser(req, res) {
    const user = await userInfos.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    return res
      .status(200)
      .json({ message: "user retrieved successfully", data: user });
  }

  //user login

  static async login(req, res) {
    const user = await userInfos.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "user not found kindly register first" });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      //   user.password = null;
      const token = TokenAuth.tokenGenerator({ user: user });

      return res.status(200).json({
        message: "User logged in successfully",
        token: token,
        data: user,
      });
    }
    return res.status(400).json({ error: "invalid password" });
  }

  static async updateOneUser(req, res) {
    const user = await userInfos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "failed to update user" });
    }
    return res
      .status(200)
      .json({ message: "user updated successfully", data: user });
  }
   //deleting a user
   static async deleteOneUser(req, res) {
    const user = await userInfos.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error:"user not deleted" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully",});
  }
}
export default userController;
