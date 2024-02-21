import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";

export const MarkTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Todo ID is required", errors.mapped()));
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        userId: req.userId,
      },
      {
        $set: {
          isCompleted: true, // Set isCompleted to true
        },
      },
      { new: true } // This option returns the updated document
    );

    if (updatedTodo) {
      return res.json(jsonGenerate(statusCode.SUCCESS, "Todo updated successfully", updatedTodo));
    } else {
      return res.json(jsonGenerate(statusCode.NOT_FOUND, "Todo not found", {}));
    }
  } catch (error) {
    console.error(error);
    return res.json(jsonGenerate(statusCode.INTERNAL_SERVER_ERROR, "Could not update", error));
  }
};
