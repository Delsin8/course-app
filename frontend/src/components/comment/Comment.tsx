import style from './comment.module.scss'

const comment = {
  username: 'Jobber',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget efficitur lacus. Quisque aliquet eu turpis at tincidunt. Sed bibendum orci sed varius dictum. Sed sit amet imperdiet tortor, eu tristique purus. Curabitur dignissim turpis hendrerit, convallis nibh id, consequat enim. Suspendisse pellentesque eros urna, nec finibus mi facilisis vel.',
  date: new Date().toDateString(),
}

const Comment = () => {
  return (
    <div className={style.wrapper}>
      <div>
        <div className={style.imageWrapper}>
          <img src="/images/3.jfif" />
        </div>
        <div>{comment.username}</div>
      </div>
      <div>
        <div>{comment.date}</div>
        <div>{comment.body}</div>
      </div>
    </div>
  )
}

export default Comment
