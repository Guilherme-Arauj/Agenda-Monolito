import { CreateContact } from "../../../Application/use-cases/CreateContact";
import { Request, Response } from 'express';
import { validateDTOContact } from "../../utils/zod/validateDTOContact";
import { ContactDTO } from "../../../Application/dtos/ContactDTO";

export class ContactController{
      private createContactUseCase: CreateContact

    constructor(createContactUseCase: CreateContact){
        this.createContactUseCase = createContactUseCase;
    } 

    public async create(req: Request, res: Response): Promise<void>{
       try {
        console.log("oi");
        
        const {name, age, cpf, phone, email, address, socialMedia, note, userId} = req.body;

        const reqSchema = {
            name,
            age,
            cpf,
            phone,
            email,
            address,
            socialMedia,
            note,
            userId
        };

        const validatedData = await validateDTOContact(reqSchema, res);
        if (!validatedData) return;
        
        const dto = new ContactDTO(
            validatedData.name, 
            validatedData.age, 
            validatedData.cpf, 
            validatedData.phone, 
            validatedData.email, 
            validatedData.address, 
            validatedData.socialMedia, 
            validatedData.note, 
            validatedData.userId
        );

        const userResponse = await this.createContactUseCase.execute(dto);

        res.status(201).json({
            message: "Cadastro de contato realizado com sucesso!",
            user: userResponse
        });

       } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro ao criar contato"});
       }
    }
}