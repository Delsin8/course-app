import style from './author.module.scss'

const author = {
  name: 'Drake Powers',
  courses: 10,
  students: 486,
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget efficitur lacus. Quisque aliquet eu turpis at tincidunt.',
}

const Author: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.mainSection}>
        {/* img */}
        <div className={style.imageWrapper}>
          <img src="/images/4.jfif" />
        </div>
        {/* info */}
        <div>
          <h3 style={{ margin: '2px 0' }}>{author.name}</h3>
          <div className={style.grey}>Courses: {author.courses}</div>
          <div className={style.grey}>Students: {author.students}</div>
        </div>
      </div>
      {/* biography */}
      <div className={style.biography}>{author.bio}</div>
    </div>
  )
}

export default Author
