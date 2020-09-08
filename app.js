const queryString = require('querystring')
const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')
const { resolve } = require('path')

const getPostData = (req) => {
    return new Promise((res, rej) => {
        if (req.method !== "POST") {
            res({})
            return
        }

        if (req.headers['content-type'] !== "application/json") {
            resolve({})
            return
        }

        let postData = ""
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            res(JSON.parse(postData))
            // resData.postData = postData
            // res.end(JSON.stringify(resData))
        })
    })
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = queryString.parse(url.split('?')[1])
    console.log(queryString.parse(url.split('?')[1]));

    getPostData(req).then(postData => {
        req.body = postData

        const blogData = blogRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }

        const userData = userRouter(req, res)
        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }
    })

    res.writeHead(404, { 'Content-type': 'text/plan' })
    res.write("404 NOT FOUND")
    res.end()
}

module.exports = serverHandle
