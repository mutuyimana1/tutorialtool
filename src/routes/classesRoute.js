import { Router } from "express";

import classesController from "../controllers/classController";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/verifyToken";

const classesRoute = Router();

//classes routes
classesRoute.post(
  "/register", verifyToken, verifyAccess("admin"),
  classesController.createClass
);
classesRoute.post(
    "/register/:id", verifyToken, verifyAccess("admin"),
    classesController.createClass
  );
classesRoute.get(
  "/all",
  classesController.getAllClasses
);
// courseRoute.get(
//   "/get/:id",
//   coursesController.getOneCourse
// );
// courseRoute.delete(
//   "/delete/:id",
//   coursesController.deleteOneCourse
// );
// courseRoute.patch(
//   "/update/:id",
//   coursesController.updateOneCourse
// );
// courseRoute.patch("/update/:id", coursesController.updateOneCourse);
//------------

//courses route

export default classesRoute;
