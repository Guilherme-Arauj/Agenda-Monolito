import { CreateContact } from "../../Application/use-cases/CreateContact";
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
    return new ContactController(createContactUseCase);
}