import style from './review.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { review } from '../../types'
import { comment } from '../../constants/data'
import { HiUserCircle } from 'react-icons/hi'

const Review: React.FC<review> = ({ body, user, rating, created_at }) => {
  const rating_arr = []
  for (let i = 0; i < rating; i++) {
    rating_arr.push(i)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.userSection}>
        <div className={style.imageWrapper}>
          <HiUserCircle style={{ fontSize: '60px' }} />
        </div>
        <div className={style.name} style={{ fontWeight: '500' }}>
          {user.first_name}
        </div>
      </div>
      <div className={style.textSection}>
        <div className={style.flexCentered}>
          <div className={style.flexCentered}>
            {rating_arr.map(s => (
              <AiFillStar key={s} />
            ))}
          </div>
          <div className={style.date}>
            {new Date(created_at).toDateString()}
          </div>
        </div>
        <div>{body || comment}</div>
      </div>
    </div>
  )
}

export default Review
