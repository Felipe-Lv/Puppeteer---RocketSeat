const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    //com o headless ele irá mostrar o navegador aberto para você ver o que está acontecendo no navegador e depois irá te mostrar o resultado do print no console
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://instagram.com/rocketseat_oficial');

    const imgList = await page.evaluate(() => {
        //toda essa função será executada no browser

        //vamos pegar todas as imagens que estão na parte de posts
        const nodeList = document.querySelectorAll('article img');

        //transformar o NodeList em array 
        const imgArray = [...nodeList]
        //transformar os nods (elementos html) em objetos JS
        const imgList = imgArray.map(({ src }) => ({
            src
        }))

        // colocar para fora da função 
        return imgList
    })

    //escrever os dados em um arquivo local (json)
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if (err) throw new Error('Algo deu errado')
        console.log('Deu certo')
    })

    await browser.close();
})()