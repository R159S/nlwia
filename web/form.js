import { server } from "./server.js"

const form = document.querySelector("#form") //seleciona um elemento HTML com a ID #form
const input = document.querySelector("#url") //seleciona um elemento HTML com a ID #input
const content = document.querySelector("#content") //seleciona um elemento HTML com a ID #content

form.addEventListener("submit", async (event) => {
  //esse async está dizendo que essa função e uma função assincrona, que é capaz de retorna uma conclusão ou falha
  event.preventDefault() //previne eventos padrões
  content.classList.add("placeholder")//impede (via CSS, é uma classe) que o texto seja copiado


  const videoURL = input.value
  console.log("URL DO VÍDEO: ", videoURL)

  if (!videoURL.includes("shorts")) {
    //includes verifica se em uma frase existe uma determinada palavra ou caracter, neste caso, a verificação quer saber se essa URL pertence a um vídeo curto do Youtube
    return (content.textContent = "Esse vídeo não parece ser um short")
  }
  const [_, params] = videoURL.split("/shorts/") //split é um separador de texto, ele separa, nesse caso, o que vem antes de "/shorts/" e o que vem depois de "/shorts/"
  //underline "_" serve para omitir uma posição. Esse const é um tipo array, com params sendo a posição 1 e "_" sendo a posição 0
  const [videoID] = params.split("?si") //esse array só tem uma posição, então ele retorna somente a primeira

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID) 
  //obtendo uma requisição - await pausa uma função async, para aguarda essa etapa terminar e esperar o retorno de um resultado (conclusão ou falha - uma promise)

  //content.textContent = transcription.data.result //conteúdo de transcription, quando a resposta do Back-End é retornada, o axions guarda todas as respostas em data, assim, o resultado é retornado, pegando as informações contidas em data e apresentando elas em result

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result, //essa vírgula precisa está desse modo
  })//entre chaves, isto é, será enviado um objeto

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
