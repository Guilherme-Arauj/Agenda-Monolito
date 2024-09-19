"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const envConfig_1 = require("../env/envConfig");
app_1.default.listen(envConfig_1.PORT, () => {
    console.log(`Servidor rodando em localhost:${envConfig_1.PORT}`);
});
