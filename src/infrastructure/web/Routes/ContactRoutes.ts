import { Router } from 'express';
import { makeCreateContactController } from '../../factories/CreateContactFactory';

const router = Router();
const contactControllerCreateContact = makeCreateContactController();

router.post('/cadastroContato', (req, res) => contactControllerCreateContact.create(req, res));

export { router };