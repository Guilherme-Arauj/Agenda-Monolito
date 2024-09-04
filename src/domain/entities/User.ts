export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class User implements User {
    public id: string;
    public name: string;
    public email: string;
    public password: string;

    constructor({ id, name, email, password }: IUser) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}