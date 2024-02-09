
# API CONECTADA AO CHAT-GPT

Essa é uma api com apenas uma rota onde envia mensagens para o chat e recebe as respostas dele.


## Documentação da API

#### Retorna a resposta do chat

```http
  GET /mandar/:texto
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|   `texto`   |  `string`  |Mensagem que será enviada ao Chat-gpt|

#### Exemplo:

[Bom dia! Como posso ajudar você hoje?](https://ia-gqln.onrender.com/mandar/bom%20dia%20chat)
