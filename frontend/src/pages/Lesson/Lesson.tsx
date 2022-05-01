import { useEffect, useState } from 'react'
import { lesson, tab } from '../../../types'
import { client } from '../../api/client'
import CourseContent from '../../components/courseContent/CourseContent'
import Question from '../../components/qna/Question'
import Tab from '../../components/tab/Tab'
import Layout from '../../layouts/Layout/Layout'
import style from './lesson.module.scss'
import Qna from './qna'

const LessonPage = () => {
  const [lesson, setLesson] = useState<lesson>()
  const [isLoading, setIsLoading] = useState(true)

  const tabs: tab[] = [
    {
      name: 'Course content',
      content: <CourseContent />,
    },
    {
      name: 'Q&A',
      content: <Qna lesson={lesson} />,
    },
  ]

  useEffect(() => {
    const fetchLesson = async () => {
      const id = '625fbdaefafd1addcb318891'
      const response = await client.get(
        `http://localhost:5000/api/lessons/${id}?full=1`
      )

      if (response.status === 200) {
        setIsLoading(false)
        setLesson(response.data)
      }
      // else error
    }

    fetchLesson()
  }, [])

  if (isLoading) return <div>Loading</div>
  return (
    <Layout big>
      <div className={style.wrapper}>
        {/* video */}
        <div>
          <div className={style.videoWrapper}>
            <video controls width={800}>
              <source src="/videos/1.mkv" />
            </video>
          </div>
          {/* tabs */}
          <Tab tabs={tabs} inactive />
          {/* question */}
          <Qna lesson={lesson} inactive />
        </div>
        {/* section */}
        <CourseContent inactive />
      </div>
    </Layout>
  )
}

export default LessonPage
