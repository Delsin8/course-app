import FormElement from '../../components/formElement/FormElement'
import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'
import style from './user.module.scss'

const UserPage = () => {
  return (
    <Layout>
      <div className={style.wrapper}>
        <Title centered>User Settings</Title>
        <form>
          {/* <FormElement name="first_name" placeholder="First Name" />
          <FormElement name="last_name" placeholder="Last Name" />
          <FormElement name="profession" placeholder="Profession" />
          <FormElement name="country" placeholder="Country" />
          <FormElement name="birthday" placeholder="Birthday" /> */}
        </form>
      </div>
    </Layout>
  )
}

export default UserPage
