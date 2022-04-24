import style from './comment.module.scss'
import { AiFillStar } from 'react-icons/ai'

const comment = {
  username: 'Jobber',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget efficitur lacus. Quisque aliquet eu turpis at tincidunt. Sed bibendum orci sed varius dictum. Sed sit amet imperdiet tortor, eu tristique purus. Curabitur dignissim turpis hendrerit, convallis nibh id, consequat enim. Suspendisse pellentesque eros urna, nec finibus mi facilisis vel.',
  date: new Date().toDateString(),
}

const Comment = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.userSection}>
        <div className={style.imageWrapper}>
          <img src="/images/3.jfif" />
        </div>
        <div style={{ fontWeight: '500' }}>{comment.username}</div>
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
            {[0, 1, 2, 3, 4].map(s => (
              <AiFillStar key={s} />
            ))}
          </div>
          <div className={style.date}>{comment.date}</div>
        </div>
        <div>{comment.body}</div>
      </div>
    </div>
  )
}

export default Comment
