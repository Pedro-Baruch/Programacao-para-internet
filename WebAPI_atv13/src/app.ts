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

// Post post
app.post('/post', async (req: Request, res: Response) => {
  const id = await blog.create(req.body.text)
  res.status(201).json('Id do post criado: ' + id)
})

// Get de tudo
app.get('/post', async (req: Request, res: Response) =>{
  const query = req.query
  res.status(200).json(await blog.getAll(query))
})

// Get pelo id
app.get('/post/:id', async (req: Request, res: Response) =>{
  const id = req.params.id
  res.status(200).json(await blog.getById(id))
})

// Put do texto
app.put('/post/:id', async (req: Request, res: Response) =>{
  const id = req.params.id
  const updatePost = await blog.update(id,req.body.text)
  
  if(await updatePost != true){
    res.status(200).json('Atualizado com sucesso')
  }else{
    res.status(404).json('Not Found')
  }
  
  res.json("Update feito com sucesso no id: " + id)
})

// Deletar a postagem
app.delete('/post/:id', async (req: Request, res: Response) =>{
  const id = req.params.id
  let boleano: Promise<boolean> = blog.delete(id)

  if(await boleano == true){
    res.status(200).json('Escluido com sucesso')
  }else if(await boleano == false){
    res.status(404).json('Not Found')
  }
})