import app from "./app"

const porta = 3000;


app.listen(porta, () => {
    console.log(`Servidor rodando em localhost:${porta}`);
});