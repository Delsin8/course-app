import { answer } from '../../types'
import style from './qna.module.scss'
import { HiReply } from 'react-icons/hi'

const Answer: React.FC<answer> = ({ _id, body, question, user }) => {
  return (
    <div className={style.answerWrapper}>
      <div>
        <HiReply style={{ transform: 'rotate(180deg)' }} />
      </div>
      <div>
        <div className={style.author}>{user.first_name}</div>
        <div className={style.body}>{body}</div>
      </div>
    </div>
  )
}

export default Answer
