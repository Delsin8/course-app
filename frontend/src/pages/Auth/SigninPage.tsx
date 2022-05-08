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
  const [password, setPassword] = useState('')

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        <form onSubmit={handleSignin}>
          <FormElement name="email" placeholder="Email" onChange={setEmail} />
          <FormElement
            name="password"
            placeholder="Password"
            onChange={setPassword}
          />

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
