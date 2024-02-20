import express from 'express';
import Register from '../controllers/Register.controller.js';
import Login from '../controllers/Login.controller.js'
import { RegisterSchema } from '../validationSchema/registerSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';

const apiRouts = express.Router();

apiRouts.post('/register',RegisterSchema,Register);
apiRouts.post('/login',LoginSchema,Login);

export default apiRouts;
