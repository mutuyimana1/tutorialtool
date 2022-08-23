import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRoute from "./src/routes";
import courseRoute from "./src/routes/courseRouter";
import classesRoute from "./src/routes/classesRoute";
const app = express();

app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/class", classesRoute);
app.use("/",(req,res)=> res.status(200).json({
  message:"Welcome to Tutorial tool APIS"
}));
//DATABASE CONFIGURATION
const database = process.env.DATABASE;
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is well connected!");
  });
//server configuration
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
