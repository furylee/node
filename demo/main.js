const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    console.log(req.method)
    const url = req.url
    console.log(url);
    if (req.method === "GET") {
        req.query = querystring.parse(url.split('?')[1]) // 解析querystring
        res.end(JSON.stringify(req.query));
    } else {
        let postData = ""
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            console.log("postData", postData);
            res.end('hello word!')
        })
    }
})
server.listen(8000)
