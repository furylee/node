const queryString = require('querystring')
const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = queryString.parse(url.split('?')[1])
    console.log(queryString.parse(url.split('?')[1]));

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

    res.writeHead(404, {'Content-type': 'text/plan'})
    res.write("404 NOT FOUND")
    res.end()
}

module.exports = serverHandle