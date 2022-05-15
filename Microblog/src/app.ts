import express, { Request, Response } from "express"
import { Microblog } from "./entity"

const app = express()

// Aceitar requisição json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuração das portas
const port = 3000
app.listen(3000, () => {
  console.log(`Rodando no --> http://localhost:${port} <--`)
})

// Criando um obejeto do tipo micoblog
const microblog: Microblog = new Microblog;

// Criar um post
app.post('/post', (req: Request, res: Response) => {
  microblog.createPost(req.body)
  res.json(microblog.post)
})

app.get('/post', (req: Request, res: Response) =>{
  res.send(microblog.getAll())
})