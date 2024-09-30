import { v4 as uuidv4 } from 'uuid';
import { IUuidConfig } from './IUuidConfig';

export class UuidConfig implements IUuidConfig{
    
    public async generateId(): Promise<string> {
        const uuid = uuidv4();
        const uuidLimitado = uuid.substring(0, 6);
        const uuidComPrefixo = "U-" + uuidLimitado;
        return uuidComPrefixo;
    }

    public async generateContactId(): Promise<string> {
        const uuid = uuidv4();
        const uuidLimitado = uuid.substring(0, 6);
        const uuidComPrefixo = "C-" + uuidLimitado;
        return uuidComPrefixo;
    }
}


