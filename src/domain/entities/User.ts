export interface IUser {
    id?: string;
    nome: string;
    email: string;
    senha: string;
}

export class User implements IUser{
    public id?: string;
    public nome: string;
    public email: string;
    public senha: string;

    constructor({id, nome, email, senha}: IUser){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}