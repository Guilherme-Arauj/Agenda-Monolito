// src/infrastructure/database/PrismaConfig.ts
import { PrismaClient } from "@prisma/client";
import { IPrismaConfig } from "./IPrismaConfig";

const databaseUrl = process.env.DATABASE_URL;


export class PrismaConfig implements IPrismaConfig {
    public prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
}
