import Express from "express";
import OpenAI from "openai";

const app = Express();
const port = process.env.PORT || 3000;

const apiKey = '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';

const openai = new OpenAI({ apiKey: apiKey });

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
