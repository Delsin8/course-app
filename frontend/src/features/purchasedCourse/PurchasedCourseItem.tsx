import { Link } from 'react-router-dom'
import { coursePopulated } from '../../types'
import style from '../../components/display-window/displayWindow.module.scss'

interface purchasedCourseItem {
  course: coursePopulated
}

const PurchasedCourseItem: React.FC<purchasedCourseItem> = ({ course }) => {
  const getLessonID = (course: coursePopulated) => {
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
        <img
          src={`/images/${course.thumbnail || 'course_default.jpg'}`}
          className={style.iconPurchasedCourse}
        />
      </div>
      <div className={style.title}>{course.title}</div>
    </Link>
  )
}

export default PurchasedCourseItem
