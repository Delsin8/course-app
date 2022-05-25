import Section from '../../features/section/Section'
import style from './course.module.scss'
import Layout from '../../layouts/Layout/Layout'
import Author from '../../components/author/Author'
import Review from '../../components/review/Review'
import { useContext, useEffect, useState } from 'react'
import { coursePopulated, review, section } from '../../types'
import Title from '../../components/typography/Title'
import BuyingWindow from '../../components/course/buyingWindow/BuyingWindow'
import SkeletonCoursePage from './SkeletonCourse/SkeletonCoursePage'
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
import { Link } from 'react-router-dom'

const CoursePage = () => {
  const [data, setData] = useState<coursePopulated>()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(UserContext)
  const { courseID } = useParams()

  useEffect(() => {
    const url = `http://localhost:5000/api/courses/${courseID}?full=1`
    const options: RequestInit = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const fetchCourse = async () => {
      try {
        const response = await client.get(url, options)
        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
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

  const displayReviews = (reviews: review[]) => {
    return reviews.slice(0, 4)
  }

  return (
    <Layout>
      <div className={style.infoSection} onClick={() => console.log(data)}>
        <Title centered noMarginBottom>
          {data?.title}
        </Title>
        <div className={style.description}>{data?.description}</div>
      </div>
      <div className={style.sectionsWrapper}>
        <div className={style.bold} style={{ paddingBottom: '.4rem' }}>
          This course consists of these sections:
        </div>
        <div className={style.sections}>
          {data?.sections.map(d => (
            <Section key={d._id} {...d} />
          ))}
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
      {/* reviews */}
      <Title centered>Reviews</Title>
      <div className={style.reviewSection}>
        {displayReviews(data!.reviews).map(c => (
          <Review key={c._id} {...c} />
        ))}
        {data!.reviews.length > 4 && (
          <Link to={`/reviews/${data!._id}`}>See all reviews</Link>
        )}
        {user && (
          <Modal title="Some title" body={<ReviewBody dispatch={sendReview} />}>
            Write a review
          </Modal>
        )}
      </div>
      {/* buying window */}
      <BuyingWindow
        course={data!}
        notifySuccess={notifySuccess}
        notifyFailure={notifyFailure}
      />

      <ToastContainer />
    </Layout>
  )
}

export default CoursePage
