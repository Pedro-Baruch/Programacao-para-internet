import { db } from "./firestore.config"

export class microblog{

  post (texto: string){
    db.collection("post").add({
      text: texto,
      likes : 0,
      date : new Date()
    })
  }

  findID (){
    
  }
}