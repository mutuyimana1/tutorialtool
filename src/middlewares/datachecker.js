import UserInfos from "../models/users";


class DataChecker{
    static async isEmailExist(req,res,next){
        const user= await UserInfos.findOne({email:req.body.email})

        if(!user){
            return next();
        }
        return res.status(401).json({error:"email already exist"})
    }
    static async isphoneExist(req,res,next){
        const user= await UserInfos.findOne({phone:req.body.phone})

        if(!user){
            return next();
        }
        return res.status(401).json({error:"Telephone already exist please try again"})
    }
}
    export default DataChecker;