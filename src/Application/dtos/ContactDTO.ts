export class ContactDTO {
    public name: string;
    public age?: number | null;
    public cpf?: string | null;
    public phone: string;
    public email: string;
    public address?: string | null;
    public socialMedia?: string | null;
    public note?: string | null;
    public userId: string;

    constructor(
        name: string, 
        age: number | null, 
        cpf: string | null, 
        phone: string, 
        email: string, 
        address: string | null, 
        socialMedia: string | null, 
        note: string | null, 
        userId: string
    ) {
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

export class ContactResponseDTO {
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public userId: string;

    constructor(
        id: string,
        name: string,
        email: string,
        phone: string,
        userId: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.userId = userId;
    }
}
