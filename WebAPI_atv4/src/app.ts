import express, { Request, Response } from "express"
import { Blog } from "./postagem"
import cors from 'cors'

const app = express()
const blog = new Blog()
app.use(cors())

// Aceitar requisição json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuração das portas
const port = 3000
app.listen(3000, () => {
  console.log(`Rodando no --> http://localhost:${port} <--`)
})

// Post de postagens
app.post('/postagem',async (req: Request, res: Response) =>{
  const id = await blog.create(req.body.text)
  res.status(201).json('Id do post criado: ' + id)
})

// Get geral pela data
app.get('/postagem',async (req: Request, res: Response) =>{
  const getReturn = await blog.getAll()
  res.status(200).json(await blog.getAll())
})