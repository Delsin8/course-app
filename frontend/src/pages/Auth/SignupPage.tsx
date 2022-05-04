import { useState } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../api/client'
import { ContainedButton } from '../../components/button/Button'
import FormElement from '../../components/formElement/FormElement'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import style from './authPages.module.scss'

const SigninPage = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === confirmPassword) {
      client.post(
        'http://localhost:5000/api/users/signup',
        JSON.stringify({ email, first_name: name, password })
      )
    }
  }
  return (
    <Layout>
      <div className={style.wrapper}>
        {/* welcome */}
        <Title>Welcome</Title>
        {/* form */}
        <form onSubmit={handleSignup}>
          <FormElement name="email" placeholder="Email" onChange={setEmail} />
          <FormElement
            name="name"
            placeholder="First Name"
            onChange={setName}
          />
          <FormElement
            name="password"
            placeholder="Password"
            onChange={setPassword}
          />
          <FormElement
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={setconfirmPassword}
          />
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
