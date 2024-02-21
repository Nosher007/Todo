import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js"; // Import the Todo model
import User from "../models/user.js";

export const createTodo = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Todo is required", errors.mapped()));
    }

    try {
        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc,
        });
        if (result) {
            const user = await User.findOneAndUpdate(
                { _id: req.userId },
                {
                    $push: { todos: result },
                },
                { new: true } // To return the updated user document
            );
            return res.json(jsonGenerate(statusCode.SUCCESS, "Todo created Successfully", result));
        }
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTERy, "Something went wrong", error));
    }
};
