import cors from "cors" //importa a bíblioteca cors de dentro de cors
import express from "express" //importa a bíblioteca express de dentro de express

import { convert } from "./convert.js"//importando o arquivo convertido de convert
import { download } from "./download.js" //importando a função download do arquivo download.js que está dentro da pasta server
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express() //cria uma constante app que, recebe uma função de express
app.use(express.json()) //aqui, ele precisa entender que receberá conteúdo em formato JSON
app.use(cors()) //inicia a conexão do front-end com o back-end através da função de cors

app.get("/summary/:id", async (request, response) => {
  //:id representa o parâmetro que queremos que o servidor recupere em summary
  try {
  await download(request.params.id) //função download sendo usada, que receberá a id do vídeo a ser baixado - ver videoId em downloads.js
  //request.params.id = recupera de dentro das requisições parâmentros que contém o id do vídeo
  const audioConverted = await convert()
  const result = await transcribe(audioConverted) //await também é usado aqui - aguardando pelo resultado - ele recebe o audio convertido para realizar a transcrição
  
  return response.json({ result })
  } catch(error) {
    console.log(error)
    return response.json({ error })
  }
}) //recebe um requisição de summary feita pelo servidor pelo metodo GET e executa uma função que recebe a requisição e devolve a resposta da requisição feita

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text) //pegando o texto do corpo da requisição
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))
//inicia o servidor: Escuta as requisições e executa uma função anônima(não tem nome) auto-excutada Arrow Function, que gera uma mensagem no console.log do navegador
