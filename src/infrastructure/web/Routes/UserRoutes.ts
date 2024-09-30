// src/infrastructure/web/Routes/UserRoutes.ts
import { Router } from 'express';
import { makeCreateUserController } from '../../factories/CreateUserFactory';
import { makeCreateContactController } from '../../factories/CreateContactFactory';

const router = Router();
const userControllerCreateUser = makeCreateUserController(); // Usando a Factory para criar o controller
const contactControllerCreateContact = makeCreateContactController();

router.post('/cadastroContato', (req, res) => contactControllerCreateContact.create(req, res));

// Rota para criar um usuário
router.post('/cadastro', (req, res) => userControllerCreateUser.create(req, res));

export { router };