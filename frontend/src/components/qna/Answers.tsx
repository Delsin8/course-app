import { useEffect, useState } from 'react'
import { client } from '../../api/client'
import { SkeletonAnswers } from '../../pages/Lesson/SkeletonLessonPage/SkeletonLessonComponents'
import { answer } from '../../types'
import Answer from './Answer'
import style from './qna.module.scss'

interface answers {
  questionID: string
}

const Answers: React.FC<answers> = ({ questionID }) => {
  const [answers, setAnswers] = useState<answer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnswers = async () => {
      const url = `/api/answers/question/${questionID}`
      try {
        const res = await client.get(url)

        setIsLoading(false)
        setAnswers(res.data)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    fetchAnswers()
  }, [isLoading, questionID])

  if (isLoading) return <SkeletonAnswers />

  return (
    <div className={style.answersWrapper}>
      {answers.length > 0 ? (
        answers.map(a => <Answer key={a._id} {...a} />)
      ) : (
        <div>There's no answers yet</div>
      )}
    </div>
  )
}

export default Answers
