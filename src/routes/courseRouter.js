import { Router } from "express";

import coursesController from "../controllers/coursesController";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/verifyToken";

const courseRoute = Router();

//courses routes
courseRoute.post(
  "/register", verifyToken, verifyAccess("admin"),
  coursesController.createCourse
);
courseRoute.post(
  "/register/:id", verifyToken, verifyAccess("admin"),
  coursesController.createCourse
);
courseRoute.get(
  "/all",
  coursesController.getAllCourses
);
courseRoute.get(
  "/get/:id",
  coursesController.getOneCourse
);
courseRoute.delete(
  "/delete/:id",
  coursesController.deleteOneCourse
);
courseRoute.patch(
  "/update/:id",
  coursesController.updateOneCourse
);
// courseRoute.patch("/update/:id", coursesController.updateOneCourse);
//------------

//courses route

export default courseRoute;
