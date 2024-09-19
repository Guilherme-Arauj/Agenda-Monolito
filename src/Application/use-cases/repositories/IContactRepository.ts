import { Contact, IContact } from "../../../Domain/entities/Contact";

export interface IContactRepository {
    create(contact: Contact): Promise<Contact>;
    contactTable(idUserCreator: string): Promise<Contact>;
    update(emailContact: string, topic: string, alteration: any): Promise<string>;
    delete(emailContact: string): Promise<string>;
}