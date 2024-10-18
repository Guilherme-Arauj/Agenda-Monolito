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

export class UserLoginDTO{
    public email: string;
    public password: string;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password;
    }
}