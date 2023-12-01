import Express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = Express();
const port = process.env.PORT || 3001;

app.use(cors());

const apiKey = 'sk-kS6J4Dnxll9a8HcQhpqUT3BlbkFJB7R8WygbhnDLGY3VYPG';

const openai = new OpenAI({ apiKey: `${apiKey}1` });

async function main(conteudo) {
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: conteudo }],
            stream: true,
        });

        let resposta = '';
        for await (const chunk of stream) {
            resposta += chunk.choices[0]?.delta?.content || "";
        }

        return resposta;
    } catch (erro) {
        console.error('Erro ao interagir com a OpenAI:', erro.message);
        throw erro;
    }
}

app.get("/mandar/:texto", async (req, res) => {
    const { texto } = req.params;
    
    try {
        const resposta = await main(texto);
        return res.send(resposta);
    } catch (erro) {
        return res.status(500).send('Erro interno no servidor');
    }
});

app.listen(port, () => {
    console.log("Servidor Rodando");
});
