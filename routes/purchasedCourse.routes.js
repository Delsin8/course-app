const { Router } = require('express')
const {
  createPurchasedCourse,
  getPurchasedCourse,
  updatePurchasedCourse,
  deletePurchasedCourse,
} = require('../controllers/purchasedCourseController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', auth, createPurchasedCourse)
router.get('/', auth, getPurchasedCourse)
router.put('/:id', updatePurchasedCourse)
router.delete('/:id', deletePurchasedCourse)

module.exports = router
