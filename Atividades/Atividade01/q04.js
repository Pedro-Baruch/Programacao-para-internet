const axios = require('axios').default
const cheerio = require('cheerio').default

function main(){
    const url = 'https://ifpi.edu.br/teresinacentral'

    scraping(url)
}

async function scraping(url){
    await axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data)
            
            console.log("-----------NAVTREE-----------")
            $('.navTreeItem').each((index,element) => {
                const link = $(element).find('a').attr("href")
                
                console.log(link)
            })

            console.log('--------------ROW-------------')
            $('.row').each((index,element) => {
                const link = $(element).find('a').attr("href")

                console.log(link)
            })

            console.log('------PORTALSERVICOS------------')
            $('.portalservicos-item').each((index,element) => {
                const link = $(element).find('a').attr("href")

                console.log(link)
            })

        }).catch(error => {
            console.error(error)
        })
} 

main()