"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    constructor({ id, name, age = null, cpf = null, phone, email, address = null, socialMedia = null, note = null, userId }) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.socialMedia = socialMedia;
        this.note = note;
        this.userId = userId;
    }
}
exports.Contact = Contact;
