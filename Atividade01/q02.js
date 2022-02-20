const axios = require('axios').default

function main(){
    const url = 'https://github.com/'

    getData(url)
}

async function getData(url){
    await axios.get(url)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error)
        })
}

main()

