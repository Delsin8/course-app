import Section from '../../components/course/Section'
import style from './course.module.scss'
import Layout from '../../layouts/Layout/Layout'
import Author from '../../components/author/Author'
import Review from '../../components/review/Review'
import { useContext, useEffect, useState } from 'react'
import { course, course2, section } from '../../types'
import Title from '../../components/typography/Title'
import BuyingWindow from '../../components/course/BuyingWindow'
import SkeletonCoursePage from './Skeleton/SkeletonCoursePage'
import { OutlinedButton } from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import ReviewBody, { ratingType } from './Modal/ReviewBody'
import { client } from '../../api/client'
import { UserContext } from '../../UserContext'
import {
  notifyFailure,
  notifySuccess,
} from '../../components/notification/Notification'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'

interface course3 extends course {
  sections: section[]
}

const CoursePage = () => {
  const [data, setData] = useState<course3>()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(UserContext)
  const { courseID } = useParams()

  useEffect(() => {
    const url = `http://localhost:5000/api/courses/${courseID}`
    const options: RequestInit = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const fetchCourse = async () => {
      const response = await fetch(url, options)
      if (response.ok) {
        setData(await response.json())
        setIsLoading(false)
      } else console.log('Something went wrong')
    }

    fetchCourse()
  }, [isLoading, courseID])

  if (isLoading) return <SkeletonCoursePage />

  const sendReview = async (text: string, rating: ratingType) => {
    try {
      const url = 'http://localhost:5000/api/reviews'
      const token = localStorage.getItem('token')

      const res = await client.post(
        url,
        JSON.stringify({ body: text, rating, course: data?._id }),
        { headers: { 'x-api-key': token } }
      )
      if (res.status < 204) setIsLoading(true)
    } catch (error) {
      notifyFailure('This course was already reviewed by this account')
      console.log(error)
    }
  }
  return (
    <Layout>
      {/* info */}
      <div className={style.infoSection} onClick={() => console.log(data)}>
        <Title centered noMarginBottom>
          {data?.title}
        </Title>
        <div className={style.description}>{data?.description}</div>
      </div>
      {/* course content */}
      <div className={style.sectionsWrapper}>
        <div style={{ paddingBottom: '.4rem', fontWeight: '500' }}>
          This course consists of these sections:
        </div>
        <div className={style.sections}>
          {data?.sections.map(d => (
            <Section key={d._id} {...d} />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            textDecoration: 'underline',
            fontSize: '.8rem',
          }}
        >
          Show full course content
        </div>
      </div>
      {/* authors */}
      <div>
        <Title>Authors: {data?.authors.length}</Title>
        <div className={style.authorSection}>
          {data?.authors.map(a => (
            <Author key={a._id} {...a} />
          ))}
        </div>
      </div>
      {/* comments */}
      <Title centered>Comments</Title>
      <div className={style.commentSection}>
        {data?.reviews.map(c => (
          <Review key={c._id} {...c} />
        ))}
        {user && (
          <Modal title="Some title" body={<ReviewBody dispatch={sendReview} />}>
            Write a review
          </Modal>
        )}
      </div>
      {/* buying window */}
      <BuyingWindow
        courseID={data?._id!}
        notifySuccess={notifySuccess}
        notifyFailure={notifyFailure}
      />

      <ToastContainer />
    </Layout>
  )
}

export default CoursePage
