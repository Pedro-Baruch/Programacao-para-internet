import { Any } from "typeorm"
import { PostFire } from "./firestore.config"

class Post {
  id: string
  text: string
  likes: number
  date: Date

  constructor(id: string, text: string, likes: number, date: Date) {
      this.id = id
      this.text = text
      this.likes = likes
      this.date = date
  }
}

export class microblog{

  // Criar um novo post
  async create (texto: string){
    const criar = await PostFire.add({
      texto,
      likes : 0,
      date : new Date()
    })
    
    return criar.id
  }
  
  // Retornar todos os posts ordenados pela data mais recente para mais antiga
  async getAll (){
    const snapshot = await PostFire.get()

    snapshot.forEach(function (doc: any){
      console.log(doc.id,'=>',doc.data())
    })
  }

  // Retornar apenas um post pelo id recebido
  async getById(id: string){
    const post = await PostFire.doc(id).get()
    const postReturn = post.data()

    return postReturn
  }

  // Fazer update dos posts através do id
  async update (id: string,alt: string){
    const idRef = PostFire.doc(id)
    
    await idRef.update({
      text : alt
    })
  }
  
  // Deletar através do id
  async delete (id: string){
    const idRef = PostFire.doc(id).delete()
  }
}