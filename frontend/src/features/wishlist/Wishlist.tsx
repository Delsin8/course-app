import { useEffect, useState } from 'react'
import { client } from '../../api/client'
import { wishlist } from '../../types'
import style from '../../components/display-window/displayWindow.module.scss'
import WishlistItem from './WishlistItem'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<wishlist>()
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const url = 'http://localhost:5000/api/wishlists'
        const token = localStorage.getItem('token')

        const response = await client.get(url, {
          headers: { 'x-api-key': token },
        })

        setWishlist(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPurchasedCourses()
  }, [])

  return (
    <div className={style.container}>
      {wishlist?.courses.map(c => (
        <WishlistItem {...c} key={`purchased_course_${c._id}`} />
      ))}
    </div>
  )
}

export default Wishlist
