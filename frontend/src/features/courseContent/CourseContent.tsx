import { useEffect, useState } from 'react'
import { coursePopulated, section } from '../../types'
import { client } from '../../api/client'
import style from './courseContent.module.scss'
import SkeletonCourseContent from './SkeletonCourseContent'
import { Link } from 'react-router-dom'

interface courseContent {
  courseID?: string
  inactive?: boolean
}

const CourseContent: React.FC<courseContent> = ({ courseID, inactive }) => {
  const [data, setData] = useState<coursePopulated>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (courseID) {
      const fetchCourseContent = async () => {
        try {
          const url = `/api/courses/${courseID}?content=1`

          const response = await client.get(url)

          setData(response.data)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      }

      fetchCourseContent()
    }
  }, [courseID])

  if (isLoading) return <SkeletonCourseContent inactive={inactive} />

  return (
    <div className={`${style.wrapper} ${inactive ? style.inactive : ''}`}>
      {data?.sections.map(s => (
        <div className={style.sectionWrapper} key={s._id}>
          <div className={style.title}>{s.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {s.lessons.map(l => (
              <Link
                to={`/lessons/${l._id}`}
                key={l._id}
                className={style.lesson}
              >
                <div>{l.title}</div>
                <div className={style.lessonDuration}>{l.duration}m</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseContent
