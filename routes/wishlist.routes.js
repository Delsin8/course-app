const { Router } = require('express')
const {
  getWishlist,
  updateWishlist,
} = require('../controllers/wishlistController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.get('/', auth, getWishlist)
router.put('/', auth, updateWishlist)

module.exports = router
