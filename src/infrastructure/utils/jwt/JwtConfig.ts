import jwt from "jsonwebtoken";
import { IJwtConfig } from "./IJwtConfig";

export class JwtConfig implements IJwtConfig {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public sign(payload: object, expiresIn: string): string {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    public verify(token: string): object | null | string {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            return null;
        }
    }
}