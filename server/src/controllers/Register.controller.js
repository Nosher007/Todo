import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode } from "../utils/constant.js";
import bcrypt from 'bcrypt'
const Register=async (req,res)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const{name,username,password,email}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password.salt);
        password=hashPassword;



        // Save to Db

    }
    res.json(jsonGenerate(statusCode.validationResult,"Validation error",errors.mapped()));
}

export default Register;