// DTO para criação de usuário - DTO utilizada apenas para a criação de um usuário;
export class UserDTO{
    public name: string;
    public email: string;
    public password: string;

    constructor(name:string, email:string, password:string){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

//DTO para response - Esse DTO é para ser utilizada sempre que os dados do usuário devem ser retornados;
export class UserResponseDTO{
    public name: string;
    public email: string;
    public id: string;

    constructor(name:string, email:string, id:string){
        this.name = name;
        this.email = email;
        this.id = id;
    }
}
