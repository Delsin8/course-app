const { Router } = require('express')
const {
  createPurchasedCourse,
  getPurchasedCourse,
  updatePurchasedCourse,
  deletePurchasedCourse,
  checkPurchase,
} = require('../controllers/purchasedCourseController')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', auth, createPurchasedCourse)
router.get('/', auth, getPurchasedCourse)
router.put('/:id', updatePurchasedCourse)
router.delete('/:id', deletePurchasedCourse)
router.get('/check/:id', auth, checkPurchase)

module.exports = router
