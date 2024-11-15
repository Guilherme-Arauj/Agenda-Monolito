import { CreateContact } from "../../../Application/use-cases/CreateContact";
import { Request, Response } from 'express';
import { validateDTOContact } from "../../utils/zod/validateDTOContact";
import { validateDTOContactView } from "../../utils/zod/validateDTOContactView";
import { ContactDTO, ContactViewResponseDTO } from "../../../Application/dtos/ContactDTO";
import { GetContacts } from "../../../Application/use-cases/GetContacts";
import { log } from "console";

export class ContactController {
    private createContactUseCase: CreateContact;
    private getContactsUseCase: GetContacts;

    constructor(createContactUseCase: CreateContact, getContactsUseCase: GetContacts) {
        this.createContactUseCase = createContactUseCase;
        this.getContactsUseCase = getContactsUseCase;
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {

            const { name, age, cpf, phone, email, address, socialMedia, note } = req.body;
            const userId = req.user?.id

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

            const validatedData =  validateDTOContact(reqSchema, res);
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
            res.status(400).json({ message: `Erro ao criar contato - ${error}`});
        }
    }

    public async getContacts(req: Request, res: Response): Promise<void> {
        try {

            const  id  = req.user?.id;

            if (!id) {
                res.status(400).send({ message: "userId is required" });
                return;
            }

            const reqSchema = {
                id: id
            }

            const validatedData = validateDTOContactView(reqSchema, res);
            if (!validatedData) return;

            const dto = new ContactViewResponseDTO(
                validatedData.id
            );

            const userResponse = await this.getContactsUseCase.execute(dto);

            res.status(201).json({
                message: "Lista de contatos:",
                Contacts: userResponse
            });

        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: `Erro ao gerar contatos - ${error}` });
        }
    }
}