export interface IUuidConfig {
    generateId():Promise<string>;
    generateContactId(): Promise<string>;
}