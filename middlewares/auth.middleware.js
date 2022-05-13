const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  let token = req.header('x-api-key')

  if (!token) return res.sendStatus(401)
  token = token.replace(/["]+/g, '')
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).send("Token was not provided or it's invalid")
  }
}

module.exports = auth
