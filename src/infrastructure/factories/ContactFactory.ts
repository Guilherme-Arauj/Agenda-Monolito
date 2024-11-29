import { TokenMiddleware } from "../../Application/middleware/TokenMiddleware";
import { CreateContact } from "../../Application/use-cases/CreateContact";
import { GetContacts } from "../../Application/use-cases/GetContacts";
import { ContactRepository } from "../../Application/use-cases/repositories/ContactRepository";
import { IContactRepository } from "../../Application/use-cases/repositories/IContactRepository";
import { IPrismaConfig } from "../database/IPrismaConfig";
import { PrismaConfig } from "../database/PrismaConfig";
import { IUuidConfig } from "../utils/uuid/IUuidConfig";
import { UuidConfig } from "../utils/uuid/UuidConfig";
import { ContactController } from "../web/controllers/ContactController";
import { ICpfValidator } from "../utils/cpfValidation/ICpfValidator";
import { CpfValidator } from "../utils/cpfValidation/CpfValidator";
import { UpdateContact } from "../../Application/use-cases/UpdateContact";
import { DeleteContact } from "../../Application/use-cases/DeleteContact";
import { DeleteAllContacts } from "../../Application/use-cases/DeleteAllContacts";

export function ContactFactory(): ContactController {
    const prismaConfig: IPrismaConfig = new PrismaConfig();
    const secretKey = process.env.SECRET_KEY as string;

    const contactRepository: IContactRepository = new ContactRepository(prismaConfig);
    const uuidConfig: IUuidConfig = new UuidConfig();
    const cpfValidator: ICpfValidator = new CpfValidator(contactRepository);

    const createContactUseCase = new CreateContact(contactRepository, uuidConfig, cpfValidator);
    const getContactsUseCase = new GetContacts(contactRepository);
    const updateContactsUseCase = new UpdateContact(contactRepository, cpfValidator);
    const deleteContactUseCase = new DeleteContact(contactRepository);
    const deleteAllContactsUseCase = new DeleteAllContacts(contactRepository);
    

    return new ContactController(createContactUseCase, getContactsUseCase, updateContactsUseCase, deleteContactUseCase, deleteAllContactsUseCase);
}