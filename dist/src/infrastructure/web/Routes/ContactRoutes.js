"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const ContactFactory_1 = require("../../factories/ContactFactory");
const TokenMiddlewareFactory_1 = require("../../factories/TokenMiddlewareFactory");
const contactRouter = (0, express_1.Router)();
exports.contactRouter = contactRouter;
const contactController = (0, ContactFactory_1.ContactFactory)();
const tokenMiddleware = (0, TokenMiddlewareFactory_1.TokenMiddlewareFactory)();
// Rota para criar um contato 
contactRouter.post('/cadastroContato', tokenMiddleware.verifyToken, (req, res) => contactController.create(req, res));
// Rota para visualizar todos os contatos do usuário 
contactRouter.get('/listarContatos', tokenMiddleware.verifyToken, (req, res) => contactController.getContacts(req, res));
