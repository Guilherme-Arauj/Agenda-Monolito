// src/infrastructure/web/Routes/UserRoutes.ts
import { Router } from 'express';
import { makeUserController } from '../../factories/UserControllerFactory';

const router = Router();
const userController = makeUserController(); // Usando a Factory para criar o controller

// Rota para criar um usuário
router.post('/cadastro', (req, res) => userController.create(req, res));

export { router };