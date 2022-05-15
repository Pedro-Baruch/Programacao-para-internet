import { v4 as uuidv4} from 'uuid'

class Post{

  id: string
  text: string
  likes: number

  constructor(id: string, text: string, likes: number){
    this.id = id
    this.text = text
    this.likes = likes
  }

  gerarId(): Post{


    
  }
}

export class Microblog{

  post: Post[] = []

  createPost(post: Post){
    
    post.likes = 0
    this.post.push(post)
  }

  getAll(){
    return this.post
  }
};