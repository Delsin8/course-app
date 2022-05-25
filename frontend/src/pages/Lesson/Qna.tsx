import { ReactHTMLElement, useEffect, useState } from 'react'
import { lesson, question } from '../../types'
import Question from '../../components/qna/Question'
import style from './lesson.module.scss'
import { client } from '../../api/client'
import Title from '../../components/typography/Title'
import Modal from '../../components/modal/Modal'
import QuestionBody from './Modal/QuestionBody'
import { SubmitHandler } from 'react-hook-form'
import { SkeletonQuestions } from './SkeletonLessonPage/SkeletonLessonComponents'

interface qna {
  lessonID?: string
  lessonTitle?: string
  inactive?: boolean
}

interface inputQuestion {
  title: string
  body: string
}

const Qna: React.FC<qna> = ({ inactive, lessonID, lessonTitle }) => {
  const [questions, setQuestions] = useState<question[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = `http://localhost:5000/api/questions/lesson/${lessonID}`
      try {
        const res = await client.get(url)

        setIsLoading(false)
        setQuestions(res.data)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [isLoading, lessonID])

  //
  const handleQuestion: SubmitHandler<inputQuestion> = async ({
    body,
    title,
  }) => {
    try {
      const url = `http://localhost:5000/api/questions`
      const token = localStorage.getItem('token')

      const res = await client.post(
        url,
        JSON.stringify({ lesson: lessonID, body, title }),
        {
          headers: {
            'x-api-key': token,
          },
        }
      )

      if (res.status < 204) setIsLoading(true)
    } catch (error) {
      console.log(error)
    }
  }
  //

  if (isLoading) return <SkeletonQuestions />
  if (!lessonID) return <span></span>
  return (
    <>
      <div className={style.flex}>
        <Title>Questions</Title>
        <Modal
          body={
            <QuestionBody handleQuestion={handleQuestion} lessonID={lessonID} />
          }
          title={lessonTitle || 'Ask a question'}
        >
          Ask a question
        </Modal>
      </div>
      <div
        className={`${style.questionsWrapper} ${
          inactive ? style.inactive : ''
        }`}
      >
        {questions.map(q => (
          <Question key={q._id} {...q} />
        ))}
      </div>
    </>
  )
}

export default Qna
