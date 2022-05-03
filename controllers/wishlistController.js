const Wishlist = require('../models/Wishlist')

// create a wishlist
// router.post('/', (req, res) => {
//     const { user, course } = req.body
//     Wishlist.create({ title, description, price,  language }, (err, data) => {
//         if (err) return res.status(400).send(err)
//         res.status(201).json(data)
//     })
// })

const getWishlist = (req, res) => {
  const id = req.params.id
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Wishlist.findById(id, (err, data) => {
      if (err) return res.status(400).json(err)
      res.json(data)
    })
  } else res.sendStatus(404)
}

const updateWishlist = async (req, res) => {
  const id = req.params.id
  const { course } = req.body

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const wishlist = await Wishlist.findById(id)
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
