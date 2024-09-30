"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidConfig = void 0;
const uuid_1 = require("uuid");
class UuidConfig {
    async generateId() {
        const uuid = (0, uuid_1.v4)();
        const uuidLimitado = uuid.substring(0, 6);
        const uuidComPrefixo = "U-" + uuidLimitado;
        return uuidComPrefixo;
    }
    async generateContactId() {
        const uuid = (0, uuid_1.v4)();
        const uuidLimitado = uuid.substring(0, 6);
        const uuidComPrefixo = "C-" + uuidLimitado;
        return uuidComPrefixo;
    }
}
exports.UuidConfig = UuidConfig;
