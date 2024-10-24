"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfig = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtConfig {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    sign(payload, expiresIn) {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn });
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JwtConfig = JwtConfig;
