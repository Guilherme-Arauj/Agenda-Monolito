import { CreateContact } from "../../../Application/use-cases/CreateContact";
import { Request, Response } from 'express';
import { validateDTOContact } from "../../utils/zod/validateDTOContact";
import { validateDTOContactView } from "../../utils/zod/validateDTOContactView";
import { ContactDeleteDTO, ContactDTO, ContactUpdateDTO, ContactViewResponseDTO } from "../../../Application/dtos/ContactDTO";
import { GetContacts } from "../../../Application/use-cases/GetContacts";
import { validateDTOContactUpdate } from "../../utils/zod/validateDTOContactUpdate";
import { UpdateContact } from "../../../Application/use-cases/UpdateContact";
import { DeleteContact } from "../../../Application/use-cases/DeleteContact";
import { validateDeleteContactDTO } from "../../utils/zod/validateDeleteContactDTO";
import { DeleteAllContacts } from "../../../Application/use-cases/DeleteAllContacts";

export class ContactController {
    private createContactUseCase: CreateContact;
    private getContactsUseCase: GetContacts;
    private updateContactUseCase: UpdateContact;
    private deleteContactUseCase: DeleteContact;
    private deleteAllContactsUseCase: DeleteAllContacts;

    constructor(createContactUseCase: CreateContact, getContactsUseCase: GetContacts, updateContactUseCase: UpdateContact, deleteContactUseCase: DeleteContact, deleteAllContactsUseCase: DeleteAllContacts) {
        this.createContactUseCase = createContactUseCase;
        this.getContactsUseCase = getContactsUseCase;
        this.updateContactUseCase = updateContactUseCase;
        this.deleteContactUseCase = deleteContactUseCase;
        this.deleteAllContactsUseCase = deleteAllContactsUseCase;
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {

            const { name, age, cpf, phone, email, address, socialMedia, note, category } = req.body;
            const userId = req.session.user?.id;

            const reqSchema = {
                name,
                age,
                cpf,
                phone,
                email,
                address,
                socialMedia,
                note,
                category,
                userId
            };

            const validatedData = validateDTOContact(reqSchema, res);
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
                validatedData.category,
                validatedData.userId

            );

            const userResponse = await this.createContactUseCase.execute(dto);

            res.status(201).json({
                message: "Cadastro de contato realizado com sucesso!",
                user: userResponse
            });

        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: `Erro ao criar contato - ${error}` });
        }
    }

    public async updateContact(req: Request, res: Response) {
        try {
            const { name, age, cpf, phone, email, address, socialMedia, note, category, id } = req.body;
            const userId = req.session.user?.id;

            const reqSchema = {
                name,
                age,
                cpf,
                phone,
                email,
                address,
                socialMedia,
                note,
                category,
                userId,
                id,
            };

            const validatedData = validateDTOContactUpdate(reqSchema, res);
            if (!validatedData) return;

            const dto = new ContactUpdateDTO(
                validatedData.name,
                validatedData.age,
                validatedData.cpf,
                validatedData.phone,
                validatedData.email,
                validatedData.address,
                validatedData.socialMedia,
                validatedData.note,
                validatedData.category,
                validatedData.userId,
                validatedData.id
            );

            const userResponse = await this.updateContactUseCase.execute(dto);

            res.status(201).json({
                message: "Contato atualizado com sucesso!",
                Contacts: userResponse
            });

        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: `Erro ao atualizar contatos - ${error}` });
        }
    }

    public async getContacts(req: Request, res: Response): Promise<void> {
        try {

            const id = req.session.user?.id;


            if (!id) {
                res.status(400).send({ message: "É necessário o userId" });
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

    public async deleteContact(req: Request, res: Response): Promise<void> {
        try {
            const {contactId} = req.body;

            if (!contactId) {
                res.status(400).send({ message: "É necessário o ID do contato" });
                return;
            }

            const reqSchema = {
                contactId: contactId
            }

            const validatedData = validateDeleteContactDTO(reqSchema, res);
            if (!validatedData) return;

            const dto = new ContactDeleteDTO(
                validatedData.contactId
            );

            const userResponse = await this.deleteContactUseCase.execute(dto);

            res.status(201).json({
                message: "Contato excluído com sucesso!",
                Contacts: userResponse
            });

        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: `Erro ao gerar contatos - ${error}` });
        }
    }

    public async deleteAllContacts(req: Request, res: Response){
        try {

            const id = req.session.user?.id;

            if (!id) {
                res.status(400).send({ message: "É necessário o userId" });
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

            const userResponse = await this.deleteAllContactsUseCase.execute(dto);

            res.status(201).json({
                message: "Todos seus contatos excluídos com sucesso!",
                Contacts: userResponse
            });

        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: `Erro ao gerar contatos - ${error}` });
        }
    }
}