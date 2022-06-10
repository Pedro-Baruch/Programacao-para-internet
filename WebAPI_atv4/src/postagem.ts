import { PostRef } from "../service/firestore.config"

class Postagem{
    text: string
    likes: number
    date: Date

    constructor(text: string,likes: number,date: Date){
        this.text = text
        this.likes = likes
        this.date = date
    }
}

export class Blog{    
    async create(text: string){
        const criar = await PostRef.add({
            text: text,
            likes: 0,
            date: new Date()
        })

        return criar.id
    }

    async getAll(){
        const postagem: Postagem[] = []
        const snapshot = await PostRef.orderBy('date','desc').get()

        snapshot.forEach((doc: any) => { 
          postagem.push(doc.data())
        })

        return postagem
    }
}