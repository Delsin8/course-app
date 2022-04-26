import { useEffect, useState } from 'react'
import { lesson } from '../../../types'
import { client } from '../../api/client'
import CourseContent from '../../components/courseContent/CourseContent'
import Question from '../../components/qna/Question'
import Layout from '../../layouts/Layout/Layout'
import style from './lesson.module.scss'

const LessonPage = () => {
  const [lesson, setLesson] = useState<lesson>()
  const [isLoading, setIsLoading] = useState(true)

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
  console.log(lesson)
  return (
    <Layout>
      <div className={style.wrapper}>
        {/* video */}
        <div>
          <div className={style.videoWrapper}>
            <video controls height={400} width={800}>
              <source src="/videos/1.mkv" />
            </video>
          </div>
          {/* question */}
          <div className={style.questionsWrapper}>
            {lesson?.questions.map(q => (
              <Question key={q._id} {...q} />
            ))}
          </div>
        </div>
        {/* section */}
        <CourseContent />
      </div>
    </Layout>
  )
}

export default LessonPage
