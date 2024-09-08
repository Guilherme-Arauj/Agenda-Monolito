"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
const uuid_1 = require("uuid");
async function generateId() {
    const uuid = (0, uuid_1.v4)();
    const uuidLimitado = uuid.substring(0, 6);
    const uuidComPrefixo = "U-" + uuidLimitado;
    return uuidComPrefixo;
}
