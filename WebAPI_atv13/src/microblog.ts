import { PostFire } from "./firestore.config"

export class Post {
  text: string
  likes: number
  date: Date

  constructor(id: string, text: string, likes: number, date: Date) {
      this.text = text
      this.likes = likes
      this.date = date
  }
}

export class microblog{

  post: Post[] = []

  // Criar um novo post
  async create (texto: string){
    const criar = await PostFire.add({
      text: texto,
      likes : 0,
      date : new Date()
    })
    
    return criar.id
  }
  
  // Retornar todos os posts ordenados pela data mais recente para mais antiga
  async getAll (query: any): Promise<Post[]>{
    const snapshot = await PostFire.where('date','<=',new Date()).get()
    
    let altura: number = this.post.length
    this.post.splice(0,altura)

    const vazio: any = {}
    console.log(query)

    snapshot.forEach((doc: any) => {
      this.post.push(doc.data())
    })
      
    return this.post
  }

  // Retornar apenas um post pelo id recebido
  async getById(id: string){
    const post = await PostFire.doc(id).get()
    
    let altura: number = this.post.length
    this.post.splice(0,altura)

    this.post.push(post.data())

    return this.post
  }

  // Fazer update dos posts através do id
  async update (id: string,alt: string): Promise<boolean>{
    const postRef = await PostFire.doc(id).get()

    if(postRef.data() != null){
      await PostFire.doc(id).update({text : alt})
      return true
    }else{
      return false
    }
  }
  
  // Deletar através do id
  async delete (id: string): Promise<boolean>{
    const idRef = await PostFire.doc(id).get()

    if(idRef.data() != null){
      PostFire.doc(id).delete()
      return true
    }else{
      return false
    }
  }
}