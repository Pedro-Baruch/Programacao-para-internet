import express, { Request, Response } from "express"
import { microblog } from "./microblog"

const app = express()
const blog = new microblog()

// Aceitar requisição json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuração das portas
const port = 3000
app.listen(3000, () => {
  console.log(`Rodando no --> http://localhost:${port} <--`)
})

app.post('/post', async (req: Request, res: Response) => {
  blog.create(req.body)
  res.json('Post criado com sucesso')
})

app.get('/post', async (req: Request, res: Response) =>{
  blog.getAll()
  res.json()
})