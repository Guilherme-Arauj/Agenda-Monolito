"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserFactory_1 = require("../../factories/UserFactory");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const userController = (0, UserFactory_1.UserFactory)(); // Usando a Factory para criar o controller
// Rota para criar um usuário
userRouter.post('/cadastro', (req, res) => userController.create(req, res));
//Rota para login
userRouter.post('/login', (req, res) => userController.login(req, res));
