import { Router } from 'express';
import { UserFactory } from '../../factories/UserFactory';
import { TokenMiddleware } from '../../../Application/middleware/TokenMiddleware';

const userRouter = Router();
const userController = UserFactory(); // Usando a Factory para criar o controller



// Rota para criar um usuário
userRouter.post('/cadastro', (req, res) => userController.create(req, res));

//Rota para login
userRouter.post('/login', (req, res) => userController.login(req, res));
export { userRouter };