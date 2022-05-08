import { course } from '../../types'
import style from '../../components/display-window/displayWindow.module.scss'
import { Link } from 'react-router-dom'

interface wishlistItem {
  course: course
}

const WishlistItem: React.FC<wishlistItem> = ({ course }) => {
  return (
    <Link
      to={`/courses/${course._id}`}
      className={`${style.flex} ${style.item}`}
    >
      <div>
        <img src="/images/PEPE.png" className={style.iconPurchasedCourse} />
      </div>
      <div className={style.infoWishlist}>
        <div className={style.titleWishlist}>{course.title}</div>
        <div className={style.priceWishlist}>{course.price}$</div>
      </div>
    </Link>
  )
}

export default WishlistItem
