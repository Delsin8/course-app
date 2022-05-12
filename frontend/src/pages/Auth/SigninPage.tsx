import { Link } from 'react-router-dom'
import { client } from '../../api/client'
import { ContainedButton } from '../../components/button/Button'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import style from './authPages.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'

import { ToastContainer } from 'react-toastify'
import {
  notifyFailure,
  notifySuccess,
} from '../../components/notification/Notification'

interface input {
  email: string
  password: string
}

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>()

  const { setUser } = useContext(UserContext)

  const handleSignin: SubmitHandler<input> = async data => {
    const { email, password } = data

    try {
      const response = await client.post(
        'http://localhost:5000/api/users/signin',
        JSON.stringify({ email, password })
      )
      localStorage.setItem('token', JSON.stringify(response.data.token))
      setUser(true)
      notifySuccess('You have successfully logged in')
    } catch (error) {
      notifyFailure('Credentials are wrong')
    }
  }

  return (
    <Layout>
      <div className={style.wrapper}>
        {/* welcome */}
        <Title>Welcome</Title>
        {/* form */}
        <form className={style.form} onSubmit={handleSubmit(handleSignin)}>
          <input
            type="email"
            className={style.formElement}
            placeholder="Email"
            {...register('email', { required: 'This Field is Required' })}
          />
          {errors.email && (
            <div className={style.errorMessage}>{errors.email.message}</div>
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
          {/* <FormElement placeholder="Email" {...register('email')} /> */}
          {/* <FormElement placeholder="Password" {...register('password')} /> */}
          {errors.password && (
            <div className={style.errorMessage}>{errors.password.message}</div>
          )}
          <ContainedButton
            backgroundColor="#3C3C3C"
            color="white"
            padding="6px 20px"
            margin="10px 0"
          >
            Log in
          </ContainedButton>
        </form>

        <div className={style.link}>
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>

      <ToastContainer />
    </Layout>
  )
}

export default SigninPage
