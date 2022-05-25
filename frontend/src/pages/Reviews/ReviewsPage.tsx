import { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout/Layout'
import style from './reviewPage.module.scss'
import { useParams } from 'react-router-dom'
import { client } from '../../api/client'
import { review } from '../../types'
import Review from '../../components/review/Review'

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { courseID } = useParams()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = `http://localhost:5000/api/reviews/${courseID}`
        const res = await client.get(url)

        setIsLoading(false)
        if (res.status < 204) {
          setReviews(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchReviews()
  }, [])

  return (
    <Layout>
      <div className={style.wrapper}>
        {reviews.map(r => (
          <Review key={r._id} {...r} />
        ))}
      </div>
    </Layout>
  )
}

export default ReviewsPage
