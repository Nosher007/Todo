import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode, JWT_TOKEN_SECRET } from "../utils/constant.js";
import bcrypt from 'bcrypt';
import User from '../models/user.js'; // Import the User model
import Jwt from 'jsonwebtoken';

const Register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, username, password, email } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userExist = await User.findOne({$or:[{ email }, { username }]});

        if (userExist) {
            return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTERY, 'User or Email already exists'));
        }

        try {
            const result = await User.create({
                name,
                email,
                password: hashPassword,
                username
            });

            const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

            res.json(jsonGenerate(statusCode.SUCCESS, "Registration successful", { user: result, token }));
        } catch (error) {
            console.log(error);
            res.status(500).json(jsonGenerate(statusCode.INTERNAL_SERVER_ERROR, "Server error"));
        }
    } else {
        res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
    }
};

export default Register;
