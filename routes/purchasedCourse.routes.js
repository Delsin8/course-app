const { Router } = require('express')
const {
  createPurchasedCourse,
  getPurchasedCourse,
  updatePurchasedCourse,
  deletePurchasedCourse,
} = require('../controllers/purchasedCourseController')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.post('/', authMiddleware, createPurchasedCourse)
router.get('/', authMiddleware, getPurchasedCourse)
router.put('/:id', updatePurchasedCourse)
router.delete('/:id', deletePurchasedCourse)

module.exports = router
