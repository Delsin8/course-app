const jwt = require('jsonwebtoken')
// const Project = require('../models/Project')

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

// const belongsToUser = async (req, res, next) => {
//   try {
//     const projectID = '625bfc5e910efe369036b2cb'
//     const project = await Project.findById(projectID)
//     if (!project.user === req.user.id) return res.sendStatus(403)

//     next()
//   } catch (error) {
//     res.status(403).send("You don't have rigts to this action")
//   }
// }

module.exports = auth
