const axios = require('axios').default
const fs = require('fs')

function main(){
    const url = 'https://i.pinimg.com/originals/60/5c/62/605c620b11f8a78d3f2416120e5b8086.jpg'

    download(url)
}

async function download(url){
    await axios({
        method: 'get',
        url: url,
        responseType: 'stream'
    })
        .then(response => {
            response.data.pipe(fs.WriteStream('narutinho_triste.jpg'))
            console.log("Ok")
        })
}

main()