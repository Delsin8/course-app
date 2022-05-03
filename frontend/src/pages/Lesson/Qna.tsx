import { ReactHTMLElement } from 'react'
import { lesson } from '../../../types'
import Question from '../../components/qna/Question'
import style from './lesson.module.scss'

interface qna {
  lesson: lesson | undefined
  inactive?: boolean
}

const Qna: React.FC<qna> = ({ lesson, inactive }) => {
  if (!lesson) return <span></span>
  return (
    <div
      className={`${style.questionsWrapper} ${inactive ? style.inactive : ''}`}
    >
      {lesson?.questions.map(q => (
        <Question key={q._id} {...q} />
      ))}
    </div>
  )
}

export default Qna
