const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization
        if (!token) return res.status(403).send(error)

        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodedData
        next()

    } catch (error) {
        res.sendStatus(403)
    }
}

module.exports = { authMiddleware }