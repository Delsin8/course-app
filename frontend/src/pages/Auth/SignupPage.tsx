import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { client } from '../../api/client'
import { UserContext } from '../../UserContext'
import { ContainedButton } from '../../components/button/Button'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import style from './authPages.module.scss'

import {
  notifyFailure,
  notifySuccess,
} from '../../components/notification/Notification'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'

interface input {
  email: string
  first_name: string
  password: string
  repeat_password: string
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<input>()

  const { setUser } = useContext(UserContext)

  const handleSignup: SubmitHandler<input> = async data => {
    try {
      const { email, first_name, password } = data
      const response = await client.post(
        '/api/users/signup',
        JSON.stringify({ email, first_name, password })
      )
      localStorage.setItem('token', JSON.stringify(response.data.token))
      setUser(true)
      console.log('success')
      notifySuccess('You have successfully registered')
    } catch (error) {
      console.log('fail')

      notifyFailure('Something went wrong')
    }
  }

  return (
    <Layout>
      <div className={style.wrapper}>
        <Title>Welcome</Title>
        {/* form */}
        <form className={style.form} onSubmit={handleSubmit(handleSignup)}>
          <input
            type="email"
            className={style.formElement}
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className={style.errorMessage}>{errors.email.message}</span>
          )}
          <input
            className={style.formElement}
            placeholder="First name"
            {...register('first_name', {
              required: 'This field is required',
              minLength: {
                value: 2,
                message: 'It should be 8 symbols or more',
              },
              maxLength: {
                value: 20,
                message: 'It should be 40 symbols or less',
              },
            })}
          />
          {errors.first_name && (
            <span className={style.errorMessage}>
              {errors.first_name.message}
            </span>
          )}
          <input
            placeholder="Password"
            className={style.formElement}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'It should be 8 symbols or more',
              },
              maxLength: {
                value: 40,
                message: 'It should be 40 symbols or less',
              },
            })}
          />
          {errors.password && (
            <span className={style.errorMessage}>
              {errors.password.message}
            </span>
          )}
          <input
            placeholder="Repeat password"
            className={style.formElement}
            {...register('repeat_password', {
              required: true,
              validate: {
                matchesPreviousPassword: value => {
                  const { password } = getValues()
                  return password === value || 'Passwords should match'
                },
              },
            })}
          />
          {errors.repeat_password && (
            <span className={style.errorMessage}>
              {errors.repeat_password.message}
            </span>
          )}

          <ContainedButton
            backgroundColor="#3C3C3C"
            color="white"
            padding="6px 20px"
            margin="10px 0"
          >
            Register
          </ContainedButton>
        </form>

        <div className={style.link}>
          <Link to="/signin">Already have an account?</Link>
        </div>
      </div>

      <ToastContainer />
    </Layout>
  )
}

export default SignupPage
