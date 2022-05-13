const { Router } = require('express')
const {
  signup,
  signin,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/check', auth, getUser)
router.get('/', getUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
