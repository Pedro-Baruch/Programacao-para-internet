const criarPostElement = (posts) => {
  const template = document.getElementById('post-template')
  const postElement = document.importNode(template.content, true);
  const postItens = postElement.querySelectorAll('p')

  const convert = (posts.date._seconds * 1000) + (posts.date._nanoseconds * 0.000001)
  const data = new Date(convert)
  const mes = Number(data.getMonth()) + 1

  postItens[0].innerText = posts.text;
  postItens[1].innerText = posts.likes + " like(s)";
  postItens[2].innerText = "data: " + data.getDate() + "/" + mes + "/" + data.getFullYear()

  return postElement
}

const loadPosts = async () => {
  const response = await fetch('http://localhost:3000/postagem');
  const posts = await response.json();

  posts.forEach(posts => {
    const timelineElement = document.getElementById('timeline')
    
    const postElement = criarPostElement(posts)
    
    timelineElement.append(postElement);
  })
}

const newPost = async () => {
  const postTextElement = document.getElementById("post-text")
  
  const post = {
    text: postTextElement.value,
    likes: 0,
    date: new Date()
  }

  const init = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(post)
  }

  const response = await fetch('http://localhost:3000/postagem',init)
  const posts = await response.json()

  const timelineElement = document.getElementById('timeline')

  const postElement = await criarPostElement(posts)

  timelineElement.append(postElement);
}

const atualizar = async () => {
  const btnAtualizar = document.querySelector('#add-post')
  
  btnAtualizar.addEventListener("click",function(){
    location.reload()
  })
}

window.onload = () =>{
  var btnNovoPost = document.getElementById('add-post')
  btnNovoPost.onclick = newPost
  loadPosts()
  atualizar()
}
