import { SubmitHandler, useForm } from 'react-hook-form'
import style from '../lesson.module.scss'
import { OutlinedButton } from '../../../components/button/Button'

import { client } from '../../../api/client'

interface questionBody {
  lessonID: string
  handleQuestion: SubmitHandler<input>
}

interface input {
  title: string
  body: string
}

const QuestionBody: React.FC<questionBody> = ({ lessonID, handleQuestion }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>()

  return (
    <div>
      <form onSubmit={handleSubmit(handleQuestion)}>
        <div>
          {/* title */}
          <textarea
            className={style.inputArea}
            placeholder="Title"
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
            placeholder="Detailed question"
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
