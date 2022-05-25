import { bioPlaceholder } from '../../constants/data'
import { author } from '../../types'
import style from './author.module.scss'
import { HiUserCircle } from 'react-icons/hi'

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
        <div className={style.imageWrapper}>
          <HiUserCircle style={{ fontSize: '60px' }} />
        </div>
        <div>
          <h3 className={style.title}>
            {first_name} {last_name}
          </h3>
          <div className={style.grey}>Courses: {courses_owned}</div>
          <div className={style.grey}>Students: {students}</div>
        </div>
      </div>
      <div className={style.biography}>{bio || bioPlaceholder}</div>
    </div>
  )
}

export default Author
