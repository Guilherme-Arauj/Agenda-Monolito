export interface IContact {
    nome: string;
    idade: number;
    cpf: string;
    telefone: string;
    email: string;
    endereco: string;
    redeSocial: string;
    observacao: string;

}

export class Contact implements IContact{
    public nome: string;
    public idade: number;
    public cpf: string;
    public telefone: string;
    public email: string;
    public endereco: string;
    public redeSocial: string;
    public observacao: string;

    constructor(nome: string, idade:number, cpf: string, telefone: string, email: string, endereco: string, redeSocial: string, observacao: string){
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
        this.redeSocial = redeSocial;
        this.observacao = observacao;
    }
}