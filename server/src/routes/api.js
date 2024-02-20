import express from 'express';
import Register from '../controllers/Register.controller.js';
import { RegisterSchema } from '../validationSchema/registerSchema.js';

const apiRouts = express.Router();

apiRouts.post('/register',RegisterSchema,Register)

export default apiRouts;
