"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaConfig = void 0;
// src/infrastructure/database/PrismaConfig.ts
const client_1 = require("@prisma/client");
class PrismaConfig {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
}
exports.PrismaConfig = PrismaConfig;
