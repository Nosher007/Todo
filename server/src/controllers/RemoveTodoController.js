import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";

export const RemoveTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Todo ID is required", errors.mapped()));
  }

  try {
    const result = await Todo.findOneAndDelete({
      userId: req.userId,
      _id: req.body.todo_id,
    });

    if (result) {
      res.json(jsonGenerate(statusCode.SUCCESS, "Removed Todo successfully", null));
    } else {
      res.json(jsonGenerate(statusCode.NOT_FOUND, "Todo not found", null));
    }
  } catch (error) {
    console.error(error);
    res.json(jsonGenerate(statusCode.INTERNAL_SERVER_ERROR, "Could not delete", null));
  }
};
