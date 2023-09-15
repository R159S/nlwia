import { pipeline } from "@xenova/transformers"

import {transcriptionExample} from "./utils/transcription.js"
export async function transcribe(audio){//recebe o audio convertido por parametro
  try {
    //essa estrutura vai tentar uma execução, caso algum erro aconteça, ele será capturado
    //return transcriptionExample
    console.log("Realizando a transcrição do vídeo")
    const transcribe = await pipeline(//aqui é onde é escolhido o modelo de Inteligência Artificial
      "automatic-speech-recognition", 
      "Xenova/whisper-small"
    )

    const transcription = await transcribe(audio, {
      //recebe o audio convertido
      //taréfas que a IA deverá fazer
      chunk_length_s: 30, //irá dividir o conteúdo do áudio em pedaços
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
    })
    console.log("Transcrição finalizada com sucesso...")
    return transcription?.text.replace("[Música]", "")//caso o retorno seja nulo, o sinal de interrogação "?" impedirá que a aplicação quebre
    //replace: Caso apareça Música, ele será trocado por ""
  } catch (error) {
    throw new Error(error)
  }
}