import classInfos from "../models/class"

class classController{
    static async createClass(req,res){
        req.body.user = req.user._id;
        req.body.course =req.params.id;
       

    const classes= await classInfos.create(req.body);

    if(!classes){
        return res.status(400).json({error:"class not created "})
    }
    return res.status(200).json({message:"class created successfully", data:classes})

}
static async getAllClasses(req, res) {
    const classes = await classInfos.find();
    if (!classes) {
      return res.status(404).json({ error: "classes not found" });
    }
    return res
      .status(200)
      .json({ message: "classes found successfully", data: classes });
  }

}

export default classController;