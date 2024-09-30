"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateContactFactory_1 = require("../../factories/CreateContactFactory");
const router = (0, express_1.Router)();
exports.router = router;
const contactControllerCreateContact = (0, CreateContactFactory_1.makeCreateContactController)();
router.post('/cadastroContato', (req, res) => contactControllerCreateContact.create(req, res));
