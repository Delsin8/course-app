const { Router } = require('express')
const {
  getWishlist,
  updateWishlist,
} = require('../controllers/wishlistController')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.get('/', authMiddleware, getWishlist)
router.put('/', authMiddleware, updateWishlist)

module.exports = router
