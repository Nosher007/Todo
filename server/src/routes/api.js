import express from 'express';
import Register from '../controllers/Register.controller.js';
import Login from '../controllers/Login.controller.js'
import { RegisterSchema } from '../validationSchema/registerSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import { createTodo } from '../controllers/Todo.controller.js';
import { check } from 'express-validator';
const apiRouts = express.Router();
export const apiProtected = express.Router();


apiRouts.post('/register',RegisterSchema,Register);
apiRouts.post('/login',LoginSchema,Login);


// protected routes;

apiProtected.post("/createTodo",[check("desc","Todo desc is required").exists()],createTodo);

export default apiRouts;
