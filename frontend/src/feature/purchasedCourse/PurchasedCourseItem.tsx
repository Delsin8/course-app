import { Link } from 'react-router-dom'
import { course } from '../../types'
import style from '../../components/display-window/displayWindow.module.scss'

interface purchasedCourseItem {
  course: course
}

const PurchasedCourseItem: React.FC<purchasedCourseItem> = ({ course }) => {
  const getLessonID = (course: course) => {
    const lesson = course.sections.find(c => {
      return c.lessons.find(l => l)
    })
    if (lesson) return lesson.lessons[0]._id
    return ''
  }

  return (
    <Link
      to={`/lessons/${getLessonID(course)}`}
      className={`${style.flex} ${style.item}`}
    >
      <div onClick={() => console.log(course)}>
        <img src="/images/PEPE.png" className={style.iconPurchasedCourse} />
      </div>
      <div className={style.title}>{course.title}</div>
    </Link>
  )
}

export default PurchasedCourseItem
