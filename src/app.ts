import { config } from "dotenv";
config();

import fastify from "fastify";
import cors from "@fastify/cors";
import OpenAI from "openai";

export const app = fastify();

const apiKey = process.env.SECRET_KEY;

const openai = new OpenAI({ apiKey: apiKey });

const corsOptions = {
  origin: "*",
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.register(cors, corsOptions);

async function main(content: string) {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: content }],
      stream: true,
    });

    let answer = "";
    for await (const chunk of stream) {
      answer = chunk.choices[0]?.delta?.content || "";
    }

    return answer;
  } catch (erro) {
    console.error("Erro ao interagir com a OpenAI:", erro.message);
    throw erro;
  }
}

app.get("/send/:text", async (req, res) => {
  const { text } = req.params as any;
  console.log(apiKey);

  try {
    const answer = await main(text);
    return res.send(answer);
  } catch (erro) {
    return res.status(500).send("Erro interno no servidor");
  }
});
