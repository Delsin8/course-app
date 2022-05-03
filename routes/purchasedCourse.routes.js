const { Router } = require('express')
const {
  createPurchasedCourse,
  getPurchasedCourse,
  updatePurchasedCourse,
  deletePurchasedCourse,
} = require('../controllers/purchasedCourseController')

const router = Router()

router.post('/', createPurchasedCourse)
router.get('/:id', getPurchasedCourse)
router.put('/:id', updatePurchasedCourse)
router.delete('/:id', deletePurchasedCourse)

module.exports = router
