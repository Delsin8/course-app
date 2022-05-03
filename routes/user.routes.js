const { Router } = require('express')
const {
  signup,
  signin,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/', getUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
