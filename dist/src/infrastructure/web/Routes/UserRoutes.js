"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserFactory_1 = require("../../factories/CreateUserFactory");
const CreateContactFactory_1 = require("../../factories/CreateContactFactory");
const router = (0, express_1.Router)();
exports.router = router;
const userControllerCreateUser = (0, CreateUserFactory_1.makeCreateUserController)(); // Usando a Factory para criar o controller
const contactControllerCreateContact = (0, CreateContactFactory_1.makeCreateContactController)();
router.post('/cadastroContato', (req, res) => contactControllerCreateContact.create(req, res));
router.post('/listarContatos', (req, res) => contactControllerCreateContact.getContacts(req, res));
// Rota para criar um usuário
router.post('/cadastro', (req, res) => userControllerCreateUser.create(req, res));
