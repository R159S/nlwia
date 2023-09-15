import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav") //isso irá converter o .mp4 para .wav

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("convertendo o vídeo...")

    ffmpeg.setFfmpegPath(ffmpegStatic) //para se usar esse bíblioteca no código, isso deve ser feito
    ffmpeg()
    .input(filePath)//localização do arquivo a ser manipulado
    .audioFrequency(16000)//frequencia de audio - para que a IA possa compreender esse audio
    .audioChannels(1)//Canal de audio - contendo 1 canal - ele retornará uma lista, o áudio estará na primeira posição do vetor
    .format("wav")
    .on("end", () => {//caso não haja erro e a conversão tenha sido finalizada
      const file = fs.readFileSync(outputPath)//depois que a conversão tenha sido finalizada, ela será lida
      const fileDecoded = wav.decode(file)//aque será executada a decodificação do arquivo - transformar o audio em código

      const audioData = fileDecoded.channelData[0]//pegará o arquivo decodificado de audio na primeira posição do array(posição 0, canal 0)
      const floatArray = new Float32Array(audioData)//formato que a inteligência artificial precisa utilizar

      console.log("Vídeo convertido com sucesso!")

      resolve(floatArray)//isso irá devolver o floatArray
      fs.unlinkSync(outputPath)//isso deletará o arquivo temporário
    })
    .on("error", (error) => {//caso haja um erro durante a conversão
      console.log("Erro ao converter o vídeo", error)
      reject(error)
    })
    .save(outputPath)//terminada a conversão, será ela será salva no outputPath
  })
