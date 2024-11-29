# Agenda-Monolito 

## Instalação e Uso
1. Clone o repositório
2. Instale as dependências utilizando o comando `npm i`
3. Criar o arquivo .env na raiz do projeto seguindo o modelo:
   
```
DATABASE_URL="mysql://user:password@address:port/database-name"

SECRET_KEY = SUA_SECRET_KEY

SESSION_SECRET = SUA_SESSION_KEY
```
4. Execute o comando `npx prisma migrate dev` para migrar a modelagem do schema.prisma para o banco de dados
5. Execute o comando `npm run dev` para iniciar o servidor.
6. Acesse o prisma studio com o comando `npx prisma studio` para visualizar o banco de dados no browser de maneira mais detalhada








