import { Link } from 'react-router-dom'
import { client } from '../../api/client'
import { ContainedButton } from '../../components/button/Button'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import style from './authPages.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'

interface input {
  email: string
  password: string
}

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<input>()

  const handleSignin: SubmitHandler<input> = async data => {
    const { email, password } = data
    const response = await client.post(
      'http://localhost:5000/api/users/signin',
      JSON.stringify({ email, password })
    )
    if (response.data) {
      localStorage.setItem('token', JSON.stringify(response.data.token))
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
    </Layout>
  )
}

export default SigninPage
