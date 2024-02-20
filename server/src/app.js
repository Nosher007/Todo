import express from 'express';
import apiRouts, { apiProtected } from './routes/api.js';
import mongoose from "mongoose";
import { DB_CONNECT } from './utils/constant.js';
import AuthMiddleware from './middlewares/AuthMiddlewere.js';
const app=express();
const PORT=3000;

mongoose.connect(DB_CONNECT)
app.use(express.json());
app.use('/api/',apiRouts);
app.use('/api/',AuthMiddleware,apiProtected);
app.listen(PORT,()=>console.log("Server is running"));