const axios = require('axios').default
const cheerio = require('cheerio').default
const input = require('prompt-sync')()

function main(){
    const url = 'https://github.com/'

    links(url)
}

async function links(url){

    const config = {
        params: {
            transformResponse: (data => {
                
                return JSON.parse(data)
            })
        }
    }

    await axios(url, config)
        .then(response => {
            console.log(response.statusText)
        })
}

main()