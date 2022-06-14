import { SubmitHandler, useForm } from 'react-hook-form'
import style from '../lesson.module.scss'
import { OutlinedButton } from '../../../components/button/Button'
import { user } from '../../../types'

import questionStyle from '../../../components/qna/qna.module.scss'
import { client } from '../../../api/client'

interface answerBody {
  questionID: string
  title: string
  body: string
  user: user
}

interface input {
  answer: string
}

const AnswerBody: React.FC<answerBody> = ({
  questionID,
  body,
  title,
  user,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>()

  const handleAnswering: SubmitHandler<input> = async ({ answer }) => {
    try {
      const url = `/api/answers`
      const token = localStorage.getItem('token')
      await client.post(
        url,
        JSON.stringify({ question: questionID, body: answer }),
        {
          headers: {
            'x-api-key': token,
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className={questionStyle.title}>
        {title}{' '}
        <span className={questionStyle.author}>(by {user.first_name})</span>
      </div>
      <div className={questionStyle.body}>{body}</div>
      <div className={style.border}></div>
      <form onSubmit={handleSubmit(handleAnswering)}>
        <div>
          <textarea
            className={style.inputArea}
            placeholder="answer"
            {...register('answer', {
              required: 'Required',
              maxLength: {
                value: 400,
                message: "Shouldn't be longer than 400 symbols",
              },
            })}
          />
          {errors.answer && (
            <div className={style.errorMessage}>{errors.answer.message}</div>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <OutlinedButton color="black" outlineColor="black">
            Send answer
          </OutlinedButton>
        </div>
      </form>
    </div>
  )
}

export default AnswerBody
