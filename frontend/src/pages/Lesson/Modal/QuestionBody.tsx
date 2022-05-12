import { SubmitHandler, useForm } from 'react-hook-form'
import style from '../lesson.module.scss'
import {
  ContainedButton,
  OutlinedButton,
} from '../../../components/button/Button'
import { user } from '../../../types'

import questionStyle from '../../../components/qna/qna.module.scss'
import { client } from '../../../api/client'

interface questionBody {
  lessonID: string
}

interface input {
  title: string
  body: string
}

const QuestionBody: React.FC<questionBody> = ({ lessonID }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>()

  const handleQuestioning: SubmitHandler<input> = async ({ body, title }) => {
    const url = `http://localhost:5000/api/questions`
    const token = localStorage.getItem('token')
    const response = await client.post(
      url,
      JSON.stringify({ lesson: lessonID, body, title }),
      {
        headers: {
          'x-api-key': token,
        },
      }
    )
  }

  return (
    <div>
      {/* <div className={questionStyle.title}>
        {lessonTitle}{' '}
      </div> */}
      {/* <div className={questionStyle.body}>{body}</div> */}
      {/* <div className={style.border}></div> */}
      <form onSubmit={handleSubmit(handleQuestioning)}>
        <div>
          {/* title */}
          <textarea
            className={style.inputArea}
            {...register('title', {
              required: 'Required',
              minLength: {
                value: 10,
                message: "Shouldn't be less than 10 symbols",
              },
              maxLength: {
                value: 60,
                message: "Shouldn't be longer than 60 symbols",
              },
            })}
          />
          {errors.title && (
            <div className={style.errorMessage}>{errors.title.message}</div>
          )}
          {/* body */}
          <textarea
            className={style.inputArea}
            {...register('body', {
              required: 'Required',
              minLength: {
                value: 3,
                message: "Shouldn't be less than 3 symbols",
              },
              maxLength: {
                value: 400,
                message: "Shouldn't be longer than 400 symbols",
              },
            })}
          />
          {errors.body && (
            <div className={style.errorMessage}>{errors.body.message}</div>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <OutlinedButton color="black" outlineColor="black">
            Send question
          </OutlinedButton>
        </div>
      </form>
    </div>
  )
}

export default QuestionBody
