import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import session from 'express-session';
import { userRouter } from './Routes/UserRoutes';
import { contactRouter } from './Routes/ContactRoutes';
import cors from 'cors';
import path from 'path';

const app: Application = express();

// Serve arquivos estáticos para a página de login
app.use('/', express.static(path.join(__dirname, '../../../public/loginPage')));

// Serve arquivos estáticos para a página de contatos
app.use('/contactPage', express.static(path.join(__dirname, '../../../public/contactPage')));

app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Página de login
app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../../../public/loginPage', 'index.html'));
});

// Página de contatos (após login)
app.get('/contactPage', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../../../public/contactPage', 'index.html'));
});

// Configura as rotas da API
app.use('/api', userRouter);
app.use('/api', contactRouter);

// Fallback para a página de login caso uma rota não seja encontrada
app.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../../../public/loginPage', 'index.html'));
});

export default app;
