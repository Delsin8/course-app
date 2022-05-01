import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ContainedButton } from '../../components/button/Button'
import FormElement from '../../components/formElement/FormElement'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import style from './authPages.module.scss'

const initialState = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
}

const SigninPage = () => {
  const [formData, setFormData] = useState(initialState)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, name, password, confirmEmail } =
      e.target as typeof e.target & {
        email: { value: string }
        name: { value: string }
        password: { value: string }
        confirmEmail: { value: string }
      }
    setFormData({
      email: email.value,
      name: name.value,
      password: password.value,
      confirmPassword: confirmEmail.value,
    })
  }

  return (
    <Layout>
      <div className={style.wrapper}>
        {/* welcome */}
        <Title>Welcome</Title>
        {/* form */}
        <form onSubmit={e => handleSubmit(e)}>
          <FormElement name="email" placeholder="Email" />
          <FormElement name="name" placeholder="Name" />
          <FormElement name="password" placeholder="Password" />
          <FormElement name="confirmPassword" placeholder="Confirm Password" />
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
    </Layout>
  )
}

export default SigninPage
