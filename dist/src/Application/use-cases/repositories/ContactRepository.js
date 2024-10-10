"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
class ContactRepository {
    constructor(prismaConfig) {
        this.prismaConfig = prismaConfig;
    }
    get prisma() {
        return this.prismaConfig.prisma;
    }
    create(contact) {
        return this.prisma.contact.create({
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
                userId: contact.userId
            }
        });
    }
    contactTable(idUserCreator) {
        return this.prisma.contact.findMany({
            where: {
                userId: idUserCreator
            },
        });
    }
    update(emailContact, topic, alteration) {
        throw new Error("Method not implemented.");
    }
    delete(emailContact) {
        throw new Error("Method not implemented.");
    }
}
exports.ContactRepository = ContactRepository;
