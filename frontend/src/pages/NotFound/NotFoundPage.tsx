import Title from '../../components/typography/Title'
import Layout from '../../layouts/Layout/Layout'

const NotFoundPage = () => {
  return (
    <Layout>
      <Title centered big>
        404
      </Title>
      <div style={{ textAlign: 'center' }}>
        This page is not avaliable. This might happen because you entered wrong
        URL or you clicked on a course that has no lessons.
      </div>
    </Layout>
  )
}

export default NotFoundPage
