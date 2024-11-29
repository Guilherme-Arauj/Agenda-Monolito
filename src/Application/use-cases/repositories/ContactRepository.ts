import { Contact } from "../../../domain/entities/Contact";
import { IContactRepository } from "./IContactRepository";
import { IPrismaConfig } from "../../../infrastructure/database/IPrismaConfig";

export class ContactRepository implements IContactRepository {
    constructor(private prismaConfig: IPrismaConfig) { }

    private get prisma() {
        return this.prismaConfig.prisma;
    }

    public async create(contact: Contact): Promise<Contact> {
        console.log("aqui");
        
        return await this.prisma.contact.create({
            data: {
                id: contact.id,
                name: contact.name,
                age: contact.age,
                cpf: contact.cpf,
                phone: contact.phone,
                email: contact.email,
                address: contact.address,
                socialMedia: contact.socialMedia,
                note: contact.note,
                category: contact.category,
                userId: contact.userId
            },
        });
    }

    public async contactTable(idUserCreator: string): Promise<Contact[]> {
        return await this.prisma.contact.findMany({
            where: {
                userId: idUserCreator,
            },
        });
    }

    public async validate(cpf: string, userId: string): Promise<Contact | null> {
       return await this.prisma.contact.findFirst({
            where: {
                AND: [
                    { userId: userId },
                    { cpf: cpf },
                ],
            },
        });

    }

    public async validateForUpdate(cpf: string, userId: string, contactId: string): Promise<Contact | null> {
        return await this.prisma.contact.findFirst({
            where: {
                AND: [
                    { userId: userId },
                    { cpf: cpf },
                    { id: { not: contactId } },
                ],
            },
        });
    }

    public async update(contact: Contact): Promise<Contact> {
        return await this.prisma.contact.update({
            where:{
                id: contact.id
            },
            data: {
                name: contact.name,
                age: contact.age,
                cpf: contact.cpf,
                phone: contact.phone,
                email: contact.email,
                address: contact.address,
                socialMedia: contact.socialMedia,
                note: contact.note,
                category: contact.category,
            },
        });
    }

    public async delete(contactId: string): Promise<Contact> {
        return await this.prisma.contact.delete({
            where:{
                id: contactId
            }
        });
    }

    public async deleteAll(userId:string): Promise<{ count: number }> {
        return await this.prisma.contact.deleteMany({
            where:{
                userId: userId
            }
        });
    }   
}
