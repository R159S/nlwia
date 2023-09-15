import axios from "axios" //importando a bíblioteca axios de axios - serve para conectar o Front-End com o Back-End
export const server = axios.create({ //exportando um constante que nomeaeremos de server, ela receberá uma função que cria uma conexão com o server
  baseURL:"http://localhost:3333"
})