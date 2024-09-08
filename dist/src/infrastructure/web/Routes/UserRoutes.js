"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// src/infrastructure/web/Routes/UserRoutes.ts
const express_1 = require("express");
const UserControllerFactory_1 = require("../../factories/UserControllerFactory");
const router = (0, express_1.Router)();
exports.router = router;
const userController = (0, UserControllerFactory_1.makeUserController)(); // Usando a Factory para criar o controller
// Rota para criar um usuário
router.post('/cadastro', (req, res) => userController.create(req, res));
