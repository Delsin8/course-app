const { Router } = require('express')
const {
  createSection,
  getSection,
  getSections,
  updateSection,
  deleteSection,
} = require('../controllers/sectionController')

const router = Router()

router.post('/', createSection)
router.get('/:id', getSection)
router.get('/', getSections)
router.put('/:id', updateSection)
router.delete('/:id', deleteSection)

module.exports = router
