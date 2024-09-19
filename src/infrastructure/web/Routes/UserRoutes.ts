// src/infrastructure/web/Routes/UserRoutes.ts
import { Router } from 'express';
import { makeCreateUserController } from '../../factories/CreateUserFactory';

const router = Router();
const userControllerCreateUser = makeCreateUserController(); // Usando a Factory para criar o controller

// Rota para criar um usuário
router.post('/cadastro', (req, res) => userControllerCreateUser.create(req, res));

export { router };