import { pipeline } from "@xenova/transformers"
import { summaryExample } from "./utils/summary.js" //importando summayExample de summary.js

export async function summarize(text) { //recebe o resutado da transcrição em forma de texto
  try {
    //return summaryExample
    console.log("Realizando o resumo...")
    const generator = await pipeline(//Esse modelo de IA realiza o resumo de um texto
      "summarization", 
      "Xenova/distilbart-cnn-12-6"
    )

    const output = await generator(text)

    console.log("resumo concluído com sucesso!")
    return output[0].summary_text//ele está pegando o texto retirado do vídeo convertido na primeira posição do array(posição 0)
  } catch (error) {
    console.log("Não foi possível realizar o resumo", error)
    throw new Error(error)
  }
}