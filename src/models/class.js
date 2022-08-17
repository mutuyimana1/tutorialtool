import mongoose from "mongoose";

const classesSchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.ObjectId,

      ref: "User",
    },
    course: {
      type: mongoose.Schema.ObjectId,

      ref: "Course",
    },
    
  },
  { timestamps: true }
);
classesSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "names phone email role ",
  }).populate({
    path: "course",
  });
  next();
});
const classes = mongoose.model("Class", classesSchema);

export default classes;
