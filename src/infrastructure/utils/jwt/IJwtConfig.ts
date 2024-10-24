export interface IJwtConfig {
    sign(payload: object, expiresIn: string): string;
    verify(token: string): object | null | string;
}
