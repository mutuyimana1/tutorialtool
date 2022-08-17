import mongoose from "mongoose"

const coursesSchema= new mongoose.Schema({

    user:{
        type: mongoose.Schema.ObjectId,

        ref:"User",
    },
    class:{
        type: mongoose.Schema.ObjectId,

        ref:"Class",
    },
    name:String,
    duration: String,
    content:String,
    coursestatus:{
        type:String,
        enum:["Enable","Disable"],
        default:"Enable"
    }
   
    },
    { timestamps: true }


)
coursesSchema.pre(/^find/,function (next){

    this.populate({

      path:"user",

      select:"names phone email role "

    }).populate({
        path: "class",
        select:"name"
      });
next();
});
const courses = mongoose.model("Course", coursesSchema);

export default courses;