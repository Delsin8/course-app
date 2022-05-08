const Wishlist = require('../models/Wishlist')

const getWishlist = (req, res) => {
  const user = req.user.payload.id

  if (user) {
    Wishlist.findOne({ user })
      .populate('courses')
      .exec((err, data) => {
        if (err) return res.status(400).json(err)
        res.json(data)
      })
  } else res.sendStatus(404)
}

const updateWishlist = async (req, res) => {
  const user = req.user.payload.id
  const { course } = req.body

  if (user) {
    const wishlist = await Wishlist.findOne({ user })
    if (wishlist.courses.includes(course)) {
      await wishlist.update({
        $pull: { courses: course },
      })
    } else {
      await wishlist.update({
        $push: { courses: course },
      })
    }
    res.status(200).json(wishlist)
  } else res.status(404).send('No results found.')
}

module.exports = { getWishlist, updateWishlist }
