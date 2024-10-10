import {Contact} from "../../../domain/entities/Contact"
import { IContactRepository } from "./IContactRepository"
import { IPrismaConfig } from "../../../infrastructure/database/IPrismaConfig"

export class ContactRepository implements IContactRepository{
    constructor(private prismaConfig: IPrismaConfig){}

    private get prisma(){
        return this.prismaConfig.prisma
    }

    create(contact: Contact): Promise<Contact> {
         return this.prisma.contact.create({
            data:{
                id: contact.id,
                name: contact.name,
                age: contact.age,
                cpf: contact.cpf,
                phone: contact.phone,
                email: contact.email,
                address: contact.address,
                socialMedia: contact.socialMedia,
                note: contact.note,
                userId: contact.userId
            }
        });
    }
    
    contactTable(idUserCreator: string): Promise<Contact[]> {
        return this.prisma.contact.findMany({
            where:{
                userId: idUserCreator
            },
        });
    }
    
    update(emailContact: string, topic: string, alteration: any): Promise<string> {
        throw new Error("Method not implemented.")
    }
    delete(emailContact: string): Promise<string> {
        throw new Error("Method not implemented.")
    }

}