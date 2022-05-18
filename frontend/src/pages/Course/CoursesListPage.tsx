import Layout from '../../layouts/Layout/Layout'
import style from './course.module.scss'
import { VscBook } from 'react-icons/vsc'
import { GrFavorite } from 'react-icons/gr'
import { useEffect, useState } from 'react'
import { course2, tab } from '../../types'
import { client } from '../../api/client'
import Course from '../../components/course/Course'
import { Link } from 'react-router-dom'
import Tab from '../../components/tab/Tab'

const CoursesListPage = () => {
  const [courses, setCourses] = useState<course2[]>([])
  const [wishlist, setWishlist] = useState<{ courses: course2[] }>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchCourses = async () => {
      // !check user
      const url = 'http://localhost:5000/api/purchased-courses'
      const token = localStorage.getItem('token')
      const response = await client.get(url, {
        headers: { 'x-api-key': token },
      })
      if (response.status < 204) {
        setCourses(response.data)
        setIsLoading(false)
      } else console.log('Something went wrong')
    }

    fetchCourses()

    // wishlist
    const fetchWishlist = async () => {
      // !check user
      const url = 'http://localhost:5000/api/wishlists'
      const token = localStorage.getItem('token')
      const response = await client.get(url, {
        headers: { 'x-api-key': token },
      })
      if (response.status < 204) {
        setWishlist(response.data)
        setIsLoading(false)
      } else console.log('Something went wrong')
    }

    fetchWishlist()
  }, [])

  const tabs: tab[] = [
    {
      name: 'Owned Courses',
      content: (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}
        >
          {courses.map(c => (
            <Link to="/courses/d" key={`owned_course_${c._id}`}>
              <Course type="list" {...c} />
            </Link>
          ))}
        </div>
      ),
      icon: <VscBook />,
    },
    {
      name: 'Wishlist',
      content: (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}
        >
          {wishlist?.courses.map(c => (
            <Link to="/courses/d" key={`wishlist_${c._id}`}>
              <Course type="list" {...c} />
            </Link>
          ))}
        </div>
      ),
      icon: <VscBook />,
    },
  ]

  if (isLoading) return <div>Loading</div>

  return (
    <Layout>
      <Tab tabs={tabs} type="list" />
    </Layout>
  )
}

export default CoursesListPage
