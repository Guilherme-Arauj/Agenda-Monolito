"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// src/infrastructure/web/Routes/UserRoutes.ts
const express_1 = require("express");
const CreateUserFactory_1 = require("../../factories/CreateUserFactory");
const router = (0, express_1.Router)();
exports.router = router;
const userControllerCreateUser = (0, CreateUserFactory_1.makeCreateUserController)(); // Usando a Factory para criar o controller
// Rota para criar um usuário
router.post('/cadastro', (req, res) => userControllerCreateUser.create(req, res));
