import { Router } from "express";
import userController from "../controllers/usercontroller";
import coursesController from "../controllers/coursesController";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/verifyToken";
import DataChecker from "../middlewares/datachecker";
import validator from "../middlewares/validator";
const userRoute = Router();

//users routes
userRoute.post(
  "/register",
  validator.newAccountRules(),
  DataChecker.isEmailExist,
  DataChecker.isphoneExist,

  validator.validateInput,
  
  userController.createUser
);
userRoute.get("/all", userController.getAllUsers);
userRoute.get(
  "/:id",
  verifyToken,
  verifyAccess("admin"),
  userController.getOneUser
);
userRoute.post("/login", userController.login);
userRoute.patch("/update/:id", userController.updateOneUser);

userRoute.delete("/delete/:id",userController.deleteOneUser);
//------------

//courses route

export default userRoute;
