const { Router } = require('express');
const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist')

const router = Router()

// create a wishlist
// router.post('/', (req, res) => {
//     const { user, course } = req.body
//     Wishlist.create({ title, description, price,  language }, (err, data) => {
//         if (err) return res.status(400).send(err)
//         res.status(201).json(data)
//     })
// })

// get a wishlist
router.get('/:id', (req, res) => {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Wishlist.findById(id, (err, data) => {
            if (err) return res.status(400).json(err)
            res.json(data)
        })
    }
    else res.sendStatus(404)
})

// update a wishlist
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const { course } = req.body

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const wishlist = await Wishlist.findById(id)
        if (wishlist.courses.includes(course)) {
            await wishlist.update({
                $pull: { courses: course }
            })
        }
        else {
            await wishlist.update({
                $push: { courses: course }
            })
        }
        res.status(200).json(wishlist)
    }
    else res.status(404).send("No results found.")
})

module.exports = router