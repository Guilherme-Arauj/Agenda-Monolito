import express, { Application } from 'express';
import { userRouter } from './Routes/UserRoutes';
import { contactRouter } from './Routes/ContactRoutes'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app: Application = express();

app.use(cors());

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Configura as rotas
app.use('/api', userRouter);
app.use('/api', contactRouter);

export default app;
