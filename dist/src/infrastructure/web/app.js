"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/web/app.ts
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = require("./Routes/UserRoutes"); // Importa as rotas de usuário
const app = (0, express_1.default)();
// Middleware para processar JSON no corpo das requisições
app.use(express_1.default.json());
// Configura as rotas
app.use('/api', UserRoutes_1.router); // Prefixo /api para as rotas de usuário
exports.default = app;
