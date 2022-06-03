import { load } from "cheerio"
import { PostFire } from "./firestore.config"

export class Post {
  text: string
  likes: number
  date: Date

  constructor(text: string, likes: number, date: Date) {
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
    const snapshot = await PostFire.orderBy('date').get()

    let altura: number = this.post.length
    this.post.splice(0,altura)

    if(query.text != null){
      const snapshotText = await PostFire.where('text','==',query.text).get()
      snapshotText.forEach((doc: any) => {
        this.post.push(doc.data())
      })
    }else if(query.likes != null){
      const snapshotLikes = await PostFire.where('likes','==',parseInt(query.likes)).get()
      snapshotLikes.forEach((doc: any) => {
        this.post.push(doc.data())
      })
    }else if(query.pages != null){
      const first = await PostFire.orderBy('date').limit(10).get()

      const last = first.docs[first.docs.length - 1]

      const next = await PostFire.orderBy('date').startAfter(last).limit(10).get()
      
      if(parseInt(query.pages) == 1){
        first.forEach((doc: any) => {
          this.post.push(doc.data())
        })
      }else{
        next.forEach((doc: any) => {
          this.post.push(doc.data())
        })
      }
    }else{
      snapshot.forEach((doc: any) => {
        this.post.push(doc.data())
      })
    }

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
  async update (id: string,altText: string, altLikes: number): Promise<boolean>{
    const postRef = await PostFire.doc(id).get()

    if(postRef.data() != null){
      if(altText != null && altLikes != null){
        await PostFire.doc(id).update({text : altText, likes: altLikes})
      }else if(altText != null && altLikes == null){
        await PostFire.doc(id).update({text : altText})
      }else{
        await PostFire.doc(id).update({likes : altLikes})
      }
      return true
    }else{
      return false
    }
  }

  // Adicionar um like
  async like(id: string): Promise<boolean>{
    const postRef = await PostFire.doc(id).get()

    const likesAtual = await postRef.data().likes

    if(postRef.data() != null){
      await PostFire.doc(id).update({likes: likesAtual+1})
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