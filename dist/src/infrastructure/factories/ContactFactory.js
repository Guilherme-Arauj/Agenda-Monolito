"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactFactory = ContactFactory;
const CreateContact_1 = require("../../Application/use-cases/CreateContact");
const GetContacts_1 = require("../../Application/use-cases/GetContacts");
const ContactRepository_1 = require("../../Application/use-cases/repositories/ContactRepository");
const PrismaConfig_1 = require("../database/PrismaConfig");
const UuidConfig_1 = require("../utils/uuid/UuidConfig");
const ContactController_1 = require("../web/controllers/ContactController");
function ContactFactory() {
    const prismaConfig = new PrismaConfig_1.PrismaConfig();
    const secretKey = process.env.SECRET_KEY;
    const contactRepository = new ContactRepository_1.ContactRepository(prismaConfig);
    const uuidConfig = new UuidConfig_1.UuidConfig();
    const createContactUseCase = new CreateContact_1.CreateContact(contactRepository, uuidConfig);
    const getContactsUseCase = new GetContacts_1.GetContacts(contactRepository);
    return new ContactController_1.ContactController(createContactUseCase, getContactsUseCase);
}
