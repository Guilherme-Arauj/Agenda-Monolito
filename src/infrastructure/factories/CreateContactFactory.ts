import { CreateContact } from "../../Application/use-cases/CreateContact";
import { GetContacts } from "../../Application/use-cases/GetContacts";
import { ContactRepository } from "../../Application/use-cases/repositories/ContactRepository";
import { IContactRepository } from "../../Application/use-cases/repositories/IContactRepository";
import { IPrismaConfig } from "../database/IPrismaConfig";
import { PrismaConfig } from "../database/PrismaConfig";
import { IUuidConfig } from "../utils/uuid/IUuidConfig";
import { UuidConfig } from "../utils/uuid/UuidConfig";
import { ContactController } from "../web/controllers/ContactController";

export function makeCreateContactController(): ContactController {
    const prismaConfig: IPrismaConfig = new PrismaConfig();

    const contactRepository: IContactRepository = new ContactRepository(prismaConfig);
    const uuidConfig: IUuidConfig = new UuidConfig();

    const createContactUseCase = new CreateContact(contactRepository, uuidConfig);
    const getContactsUseCase = new GetContacts(contactRepository);

    return new ContactController(createContactUseCase, getContactsUseCase);
}