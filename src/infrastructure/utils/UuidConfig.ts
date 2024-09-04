import { v4 as uuidv4 } from 'uuid';

export async function generateId() {
    const uuid = uuidv4();
    const uuidLimitado = uuid.substring(0, 6);
    const uuidComPrefixo = "U-" + uuidLimitado;
    return uuidComPrefixo;
}
