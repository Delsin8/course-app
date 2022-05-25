import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from '../../api/client'
import { ContainedButton } from '../../components/button/Button'
import {
  notifyFailure,
  notifySuccess,
} from '../../components/notification/Notification'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import style from '../Auth/authPages.module.scss'
import _ from 'lodash'

interface input {
  first_name: string
  last_name: string
  bio: string
}

const UserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>()

  const handleSignin: SubmitHandler<input> = async data => {
    const token = localStorage.getItem('token')
    const sanitizedValues = _.pickBy(data, value => value.length > 0)
    const { bio, first_name, last_name } = sanitizedValues

    try {
      const url = 'http://localhost:5000/api/users'
      await client.put(url, JSON.stringify({ bio, first_name, last_name }), {
        headers: { 'x-api-key': token },
      })

      notifySuccess('Data has been updated')
    } catch (error) {
      notifyFailure(
        'Something went wrong. Please try again with different parameters'
      )
    }
  }

  return (
    <Layout>
      <div className={style.wrapper}>
        <Title centered>User Settings</Title>
        <form className={style.form} onSubmit={handleSubmit(handleSignin)}>
          <input
            className={style.formElement}
            placeholder="First name"
            {...register('first_name', {
              minLength: {
                value: 2,
                message: 'It should be 2 symbols or more',
              },
              maxLength: {
                value: 20,
                message: 'It should be 20 symbols or less',
              },
            })}
          />
          {errors.first_name && (
            <div className={style.errorMessage}>
              {errors.first_name.message}
            </div>
          )}
          <input
            className={style.formElement}
            placeholder="Last name"
            {...register('last_name', {
              minLength: {
                value: 2,
                message: 'It should be 2 symbols or more',
              },
              maxLength: {
                value: 30,
                message: 'It should be 30 symbols or less',
              },
            })}
          />
          {errors.last_name && (
            <div className={style.errorMessage}>{errors.last_name.message}</div>
          )}
          <textarea
            className={style.formElement}
            rows={4}
            placeholder="Biography"
            {...register('bio', {
              minLength: {
                value: 100,
                message: 'It should be 100 symbols or more',
              },
              maxLength: {
                value: 300,
                message: 'It should be 300 symbols or less',
              },
            })}
          />
          {errors.bio && (
            <div className={style.errorMessage}>{errors.bio.message}</div>
          )}
          <ContainedButton
            backgroundColor="#3C3C3C"
            color="white"
            padding="6px 20px"
            margin="10px 0"
          >
            Save
          </ContainedButton>
        </form>
      </div>
    </Layout>
  )
}

export default UserPage
