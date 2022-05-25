import { course } from '../../types'
import style from '../../components/display-window/displayWindow.module.scss'
import { Link } from 'react-router-dom'

const WishlistItem: React.FC<course> = ({ _id, title, price, thumbnail }) => {
  return (
    <Link to={`/courses/${_id}`} className={`${style.flex} ${style.item}`}>
      <div>
        <img
          src={`/images/${thumbnail || 'course_default.jpg'}`}
          className={style.iconPurchasedCourse}
        />
      </div>
      <div className={style.infoWishlist}>
        <div className={style.titleWishlist}>{title}</div>
        <div className={style.priceWishlist}>{price}$</div>
      </div>
    </Link>
  )
}

export default WishlistItem
