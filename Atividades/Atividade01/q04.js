const axios = require('axios').default
const cheerio = require('cheerio').default

function main(){
    const url = 'https://github.com/'

    scraping(url)
}

async function scraping(url){
    await axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data)
            $('a').each((index,element) => {
                const link = $(element).attr("href")
                console.log(link);
            })
        }).catch(error => {
            console.error(error)
        })
} 

main()