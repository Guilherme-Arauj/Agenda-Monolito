import { Contact } from "../../../domain/entities/Contact";

export interface IContactRepository {
    create(contact: Contact): Promise<Contact>;
    contactTable(idUserCreator: string): Promise<Contact[]>;
    validate(cpf: string, userId: string): Promise <Contact | null>;
    validateForUpdate(cpf: string, userId: string, contactId: string): Promise<Contact | null>;
    update(contact: Contact): Promise<Contact>;
    delete(contactId: string): Promise<Contact>;
    deleteAll(userId:string): Promise<{ count: number }>;
}