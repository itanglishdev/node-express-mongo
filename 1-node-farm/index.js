const fs = require('fs')
const http = require('http')
const url = require('url')

const replaceTemplate = require('./starter/modules/replaceTemplate')

// ////////////////////////////////////
// FILES
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8')
// console.log(textIn)
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./starter/txt/output.txt', textOut)
// console.log('File written!');

// fs.readFile('./starter/txt/start.txt', 'utf-8',(err, data1) => {
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8',(err, data2) => {

//         console.log(data2)
//         fs.readFile(`./starter/txt/append.txt`, 'utf-8',(err, data3) => {
//             console.log(data3)
//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                     console.log('Your file has been written!')
//             })
//         })
//     })
//     // console.log(data)
// })
// console.log('Will read file!');

// //////////////////////////////////////////////////////


//               SERVER



const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8')

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req,res) => {
    const {query, pathname} = url.parse(req.url, true)

    //-----------  Overview Page 
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output)

    // -----------Product Page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    // -----------API
    } else if (pathname === '/api') {
         res.writeHead(200, {'Content-type': 'application/json'})
         res.end(data)

    // ---------Not Found
    }else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('<h1>This page not found!</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests port 8000');
})