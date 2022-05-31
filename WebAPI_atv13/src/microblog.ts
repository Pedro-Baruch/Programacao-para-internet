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

  async create (texto: JSON){
    const criar = await PostFire.add({
      texto,
      likes : 0,
      date : new Date()
    })
    
    console.log(criar.id)
  }
  
  async getAll (){
    const tudo = await PostFire.where('date','<=',new Date()).get()
    
    tudo.forEach(function (doc: any){
      console.log(doc.id, '=>',doc.data())
    })
  }

  async update (){
    
  }
  
  async delete (){
    
  }
}