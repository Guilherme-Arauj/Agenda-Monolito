import { Router } from 'express';
import { ContactFactory } from '../../factories/ContactFactory';
import { TokenMiddlewareFactory } from '../../factories/TokenMiddlewareFactory';

const contactRouter = Router();
const contactController = ContactFactory();
const tokenMiddleware = TokenMiddlewareFactory();


// Rota para criar um contato 
contactRouter.post('/cadastroContato', tokenMiddleware.verifyToken, (req, res) => contactController.create(req, res));

// Rota para visualizar todos os contatos do usuário 
contactRouter.get('/listarContatos', tokenMiddleware.verifyToken, (req, res) => contactController.getContacts(req, res));

// Rota para atualizar um contato do usuário 
contactRouter.post('/atualizarContatos', tokenMiddleware.verifyToken, (req, res) => contactController.updateContact(req, res));

// Rota para deletar contato específico
contactRouter.delete('/deletarContato', tokenMiddleware.verifyToken, (req, res) => contactController.deleteContact(req, res));

//Rota para deletar todos os contatos do usuário
contactRouter.delete('/deletarTodosContatos', tokenMiddleware.verifyToken, (req, res) => contactController.deleteAllContacts(req, res));

export { contactRouter };