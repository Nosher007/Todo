import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode } from "../utils/constant.js";
import bcrypt from 'bcrypt';
import User from '../models/user.js'; // Import the User model

const Register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, username, password, email } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt); // Fix typo here

        // Save to Db
        try {
            const result = await User.create({
                name: name,
                email: email,
                password: hashPassword,
                username: username
            });

            res.json(jsonGenerate(statusCode.SUCCESS, "Registration successful", result));
        } catch (error) {
            console.log(error);
            res.status(500).json(jsonGenerate(statusCode.INTERNAL_SERVER_ERROR, "Server error"));
        }
    } else {
        res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
    }
};

export default Register;
