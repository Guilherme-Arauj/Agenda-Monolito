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


export { contactRouter };