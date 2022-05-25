import { useState } from 'react'
import { question } from '../../types'
import style from './qna.module.scss'
import { MdQuestionAnswer } from 'react-icons/md'
import Modal from '../modal/Modal'
import AnswerBody from '../../pages/Lesson/Modal/AnswerBody'
import Answers from './Answers'

const Question: React.FC<question> = ({ _id, answers, body, title, user }) => {
  const [showAnswers, setShowAnswers] = useState(false)

  return (
    <div className={style.questionWrapper}>
      <div className={style.title}>
        {title} <span className={style.author}>(by {user.first_name})</span>
      </div>
      <div className={style.body}>{body}</div>
      <div className={style.flex}>
        <MdQuestionAnswer
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
      {showAnswers && <Answers questionID={_id} />}
    </div>
  )
}

export default Question
