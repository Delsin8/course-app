import { useEffect, useState } from 'react'
import { lesson, tab } from '../../types'
import { client } from '../../api/client'
import CourseContent from '../../components/courseContent/CourseContent'
import Tab from '../../components/tab/Tab'
import Layout from '../../layouts/Layout/Layout'
import style from './lesson.module.scss'
import Qna from './Qna'
import { useParams } from 'react-router-dom'
import Title from '../../components/typography/Title'
import Modal from '../../components/modal/Modal'
import QuestionBody from './Modal/QuestionBody'

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
      content: <Qna lesson={lesson} />,
    },
  ]
  useEffect(() => {
    const fetchLesson = async () => {
      const url = `http://localhost:5000/api/lessons/${lessonID}?full=1`
      const token = localStorage.getItem('token')

      const response = await client.get(url, {
        headers: { 'x-api-key': token },
      })

      if (response.status === 200) {
        setIsLoading(false)
        setLesson(response.data)
      }
      // else error
    }

    fetchLesson()
  }, [lessonID])

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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Title>Questions</Title>
            <Modal
              body={<QuestionBody lessonID={lesson!._id} />}
              title={lesson!.title}
            >
              Ask a question
            </Modal>
          </div>
          <Qna lesson={lesson} inactive />
        </div>
        {/* section */}
        <CourseContent courseID={lesson?.section.course} inactive />
      </div>
    </Layout>
  )
}

export default LessonPage
