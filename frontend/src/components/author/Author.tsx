import { bioPlaceholder } from '../../constants/data'
import { author } from '../../types'
import style from './author.module.scss'

const Author: React.FC<author> = ({
  first_name,
  last_name,
  courses_owned,
  students,
  bio,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.mainSection}>
        {/* img */}
        <div className={style.imageWrapper}>
          <img src="/images/PEPE.png" />
        </div>
        {/* info */}
        <div>
          <h3 style={{ margin: '2px 0' }}>
            {first_name} {last_name}
          </h3>
          <div className={style.grey}>Courses: {courses_owned}</div>
          <div className={style.grey}>Students: {students}</div>
        </div>
      </div>
      {/* biography */}
      <div className={style.biography}>{bio || bioPlaceholder}</div>
    </div>
  )
}

export default Author
