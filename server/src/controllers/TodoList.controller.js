import User from "../models/user.js"
import { statusCode } from "../utils/constant.js";
import { jsonGenerate } from "../utils/helper.js";

export const GetTodos=async(req,res)=>{
    try{
        const list=await User.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec();

        return res.json(jsonGenerate(statusCode.SUCCESS,"All todo list",list))
    } catch (error){
        return res.json(
            jsonGenerate(statusCode.UNPROCESSABLE_ENTERY,"Error",error)
        )
    }
}