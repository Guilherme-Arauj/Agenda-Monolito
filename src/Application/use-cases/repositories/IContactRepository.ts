import { Contact } from "../../../domain/entities/Contact";

export interface IContactRepository {
    create(contact: Contact): Promise<Contact>;
    contactTable(idUserCreator: string): Promise<Contact[]>;
    validate(cpf: string): Promise <Contact | null>;
    update(emailContact: string, topic: string, alteration: any): Promise<string>;
    delete(emailContact: string): Promise<string>;
}