const userRouter = (req, res) => {
    const method = req.method

    if (method === "POST" && req.path === "/api/blog/login") {
        return {
            msg: "登录"
        }
    }
}

module.exports = userRouter
