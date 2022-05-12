import { useState } from 'react'
import { question } from '../../types'
import Answer from './Answer'
import style from './qna.module.scss'
import { MdQuestionAnswer } from 'react-icons/md'
import Modal from '../modal/Modal'
import AnswerBody from '../../pages/Lesson/Modal/AnswerBody'

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
      <div className={style.flex}>
        <MdQuestionAnswer
          title={answers.length > 0 ? 'Show answers' : 'Not answered yet'}
          className={style.answerButton}
          onClick={() => setShowAnswers(!showAnswers)}
        />
        <span>|</span>
        <Modal
          title={title}
          body={
            <AnswerBody
              questionID={_id}
              user={user}
              title={title}
              body={body}
            />
          }
        >
          Answer
        </Modal>
      </div>
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
