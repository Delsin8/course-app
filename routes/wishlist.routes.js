const { Router } = require('express')
const {
  getWishlist,
  updateWishlist,
} = require('../controllers/wishlistController')

const router = Router()

router.get('/:id', getWishlist)
router.put('/:id', updateWishlist)

module.exports = router
