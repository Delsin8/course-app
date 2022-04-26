import { useState } from 'react'
import { question, user } from '../../../types'
import Answer from './Answer'
import style from './qna.module.scss'
import { MdQuestionAnswer } from 'react-icons/md'

const Question: React.FC<question> = ({ _id, answers, body, title, user }) => {
  const [showAnswers, setShowAnswers] = useState(false)

  return (
    <div className={style.questionWrapper}>
      {/* title */}
      <div className={style.title}>
        {title} <span className={style.author}>(by {user.first_name})</span>
      </div>
      {/* body */}
      <div className={style.body}>{body}</div>
      {/* buttons */}
      <MdQuestionAnswer
        title={answers.length > 0 ? 'Show answers' : 'Not answered yet'}
        className={style.answerButton}
        onClick={() => setShowAnswers(!showAnswers)}
      />
      {showAnswers && (
        <div className={style.answersWrapper}>
          {answers.map(a => (
            <Answer key={a._id} {...a} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Question
