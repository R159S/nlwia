import ytdl from "ytdl-core" //importa a bíblioteca ytdl (permite a realização de downloads de vídeos do Youtube) de ytdl-core
import fs from "fs" //importa a bíblioteca fs (File System - Sistemas de arquivos) de fs

export const download = (videoId) =>
  //exporta uma constante chamada download, que atua como uma função. Está sendo exportada da bíblioteca ytdl e receberá a id do vídeo por parâmetro pela variável da função, chamada videoId, que no caso será um valor temporário
  new Promise((resolve, reject) => {
    //em index.js, app.get tem uma variável download em espera(await) e exige que essa função estaja dentro de uma promisse

    const videoURL = "https://www.youtube.com/shorts/" + videoId
    //recebe a URL + a ID do vídeo que será baixado - pode ser inserido na URL watch/?v= (video) ou shorts (videos curtos)
    console.log("Realizando o download do vídeo: ", videoId) //pode ser adicionado ou a "," ou "+" aqui. O console.log também reconhece ",".

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" }) //essa função passará essa URL para a bíblioteca, ao qual fará o download do vídeo
      .on("info", (info) => {
        //mostra o acompanhamento das etapas de download do vídeo
        const seconds = info.formats[0].approxDurationMs / 1000 //calcula a duração do vídeo, tem como finalidade saber se é um vídeo curto ou não

        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 60 segundos.") //caso o vídeo tenha mais que 60 segundos, um novo erro será gerado
        }
      })
      .on("end", () => {
        console.log("Download do vídeo finalizado.") //avisa que o download do vídeo foi concluído
        resolve()//sinaliza que o download terminou
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível fazer o download do vídeo. Detalhes do erro:",
          error
        ) //caso não seja possível, um erro irá aparecer
        reject(error)//sinaliza que houve um erro no download
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4")) //pipe permite que o arquivo que será baixado, seja salvo em algum diretório, no caso, na pasta tmp(temporária) com o nome audio.mp4
  })
