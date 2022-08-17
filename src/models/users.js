import mongoose from "mongoose"

const useSchema= new mongoose.Schema({

    names:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    address:String,
    gender:{
        type:String,
        enum:["female","male","others"]
    },
    phone:String,
    role: {
        type: String,
        enum: ["user", "admin","tutor"],
        default: "user",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }


);

const user = mongoose.model("User", useSchema);

export default user;