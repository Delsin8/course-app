import { useEffect, useState } from 'react'
import { course, section } from '../../../types'
import { client } from '../../api/client'
import style from './courseContent.module.scss'
import SkeletonCourseContent from './SkeletonCourseContent'

const CourseContent: React.FC<{ inactive?: boolean }> = ({ inactive }) => {
  const [data, setData] = useState<course>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourseContent = async () => {
      const id = '61ebd93d5b288295c5227a2d'
      const url = `http://localhost:5000/api/courses/${id}?content=1`

      const response = await client.get(url)

      if (response.status === 200) {
        setData(response.data)
        // const time = 30000
        // function delay(time: number) {
        //   return new Promise(resolve => setTimeout(resolve, time))
        // }

        // delay(time).then(() => setIsLoading(false))
        setIsLoading(false)
      }
      // else error
    }

    fetchCourseContent()
  }, [])

  if (isLoading) return <SkeletonCourseContent inactive={inactive} />

  return (
    <div
      id="test"
      className={`${style.wrapper} ${inactive ? style.inactive : ''}`}
    >
      {data?.sections.map(s => (
        <div className={style.sectionWrapper} key={s._id}>
          <div className={style.title}>{s.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {s.lessons.map(l => (
              <div key={l._id} className={style.lesson}>
                <div>{l.title}</div>
                <div className={style.lessonDuration}>{l.duration}m</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseContent