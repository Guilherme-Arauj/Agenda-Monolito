"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = require("./Routes/UserRoutes");
const ContactRoutes_1 = require("./Routes/ContactRoutes");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Middleware para processar JSON no corpo das requisições
app.use(express_1.default.json());
// Configura as rotas
app.use('/api', UserRoutes_1.userRouter);
app.use('/api', ContactRoutes_1.contactRouter);
exports.default = app;
