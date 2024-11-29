export interface IContact {
    id: string;
    name: string;
    age?: number | null;
    cpf?: string | null;
    phone: string;
    email: string;
    address?: string | null;
    socialMedia?: string | null;
    note?: string | null;  
    category: string | null;
    userId: string;
}

export class Contact implements IContact {
    public id: string;
    public name: string;
    public age: number | null;
    public cpf: string | null;
    public phone: string;
    public email: string;
    public address: string | null;
    public socialMedia: string | null;
    public note: string | null;  
    public category: string | null;
    public userId: string;
    
    constructor(
        {id, name, age = null, cpf = null, phone, email, address = null, socialMedia = null, note = null, category = null, userId}: IContact
    ) { 
        this.id = id;
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.socialMedia = socialMedia;
        this.note = note;  
        this.category = category;
        this.userId = userId;    
    }
}
