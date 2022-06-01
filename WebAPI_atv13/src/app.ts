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
  const id = await blog.create(req.body)
  res.json('Id do post criado: ' + id)
})

app.get('/post/:id', async (req: Request, res: Response) =>{
  const id = req.params.id
  const postRef = blog.getById(id)
  res.json(postRef)
})

app.get('/post', async (req: Request, res: Response) =>{
  let u: any = await blog.getAll()
  res.json(u)
})

app.put('/post/:id', async (req: Request, res: Response) =>{
  const id = req.params.id
  const updatePost = blog.update(id,req.body)
  res.json("Update feito com sucesso no id: " + id)
})

app.delete('/post/:id', async (req: Request, res: Response) =>{
  const id = req.params.id
  blog.delete(id)
  res.json("O post de id {" + id + "} foi deletado com sucesso")
})