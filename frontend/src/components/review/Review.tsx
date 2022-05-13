import style from './review.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { review } from '../../types'

const comment = {
  username: 'Jobber',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget efficitur lacus. Quisque aliquet eu turpis at tincidunt. Sed bibendum orci sed varius dictum. Sed sit amet imperdiet tortor, eu tristique purus. Curabitur dignissim turpis hendrerit, convallis nibh id, consequat enim. Suspendisse pellentesque eros urna, nec finibus mi facilisis vel.',
  date: new Date().toDateString(),
}

const Review: React.FC<review> = ({
  body,
  user,
  course,
  rating,
  created_at,
}) => {
  const rating_arr = []
  for (let i = 0; i < rating; i++) {
    rating_arr.push(i)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.userSection}>
        <div className={style.imageWrapper}>
          <img src="/images/PEPE.png" />
        </div>
        <div className={style.name} style={{ fontWeight: '500' }}>
          {user.first_name}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          justifyContent: 'start',
        }}
      >
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
        <div>{body || comment.body}</div>
      </div>
    </div>
  )
}

export default Review
