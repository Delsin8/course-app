import { useEffect, useState } from 'react'
import { lesson, tab } from '../../types'
import { client } from '../../api/client'
import CourseContent from '../../features/courseContent/CourseContent'
import Tab from '../../components/tab/Tab'
import Layout from '../../layouts/Layout/Layout'
import style from './lesson.module.scss'
import Qna from './Qna'
import { useParams } from 'react-router-dom'
import { SkeletonRectangleCustom } from '../../components/skeleton/Skeleton'
import { SkeletonLessonPage } from './Skeleton/SkeletonLessonComponents'

const LessonPage = () => {
  const [lesson, setLesson] = useState<lesson>()
  const [isLoading, setIsLoading] = useState(true)
  const { lessonID } = useParams()

  const tabs: tab[] = [
    {
      name: 'Course content',
      content: <CourseContent courseID={lesson?.section.course} />,
    },
    {
      name: 'Q&A',
      content: <Qna lessonID={lesson?._id} />,
    },
  ]
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const url = `http://localhost:5000/api/lessons/${lessonID}?full=1`
        const token = localStorage.getItem('token')

        const response = await client.get(url, {
          headers: { 'x-api-key': token },
        })

        setIsLoading(false)
        setLesson(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchLesson()
  }, [lessonID, isLoading])

  if (isLoading) return <SkeletonLessonPage />
  return (
    <Layout big>
      <div className={style.wrapper}>
        {/* video */}
        <div>
          <div className={style.videoWrapper}>
            <video controls width={800}>
              <source src="/" />
            </video>
          </div>
          {/* tabs */}
          <Tab tabs={tabs} inactive />
          {/* question */}
          <Qna lessonID={lesson?._id} lessonTitle={lesson?.title} inactive />
        </div>
        {/* section */}
        <CourseContent courseID={lesson?.section.course} inactive />
      </div>
    </Layout>
  )
}

export default LessonPage
