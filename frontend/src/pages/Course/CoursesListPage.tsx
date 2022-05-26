import Layout from '../../layouts/Layout/Layout'
import style from './course.module.scss'
import { VscBook } from 'react-icons/vsc'
import { useEffect, useState } from 'react'
import { course, tab } from '../../types'
import { client } from '../../api/client'
import Course from '../../components/course/Course'
import { Link } from 'react-router-dom'
import Tab from '../../components/tab/Tab'
import SkeletonCoursesListPage from './SkeletonCoursePages/SkeletonCoursesListPage'

const CoursesListPage = () => {
  const [courses, setCourses] = useState<course[]>([])
  const [wishlist, setWishlist] = useState<{ courses: course[] }>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // courses
    const fetchCourses = async () => {
      try {
        const url = '/api/purchased-courses'
        const token = localStorage.getItem('token')
        const response = await client.get(url, {
          headers: { 'x-api-key': token },
        })

        setCourses(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    // wishlist
    const fetchWishlist = async () => {
      try {
        const url = '/api/wishlists'
        const token = localStorage.getItem('token')
        const response = await client.get(url, {
          headers: { 'x-api-key': token },
        })

        setWishlist(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCourses()
      .then(() => setIsLoading(false))
      .then(() => fetchWishlist())
  }, [])

  const tabs: tab[] = [
    {
      name: 'Owned Courses',
      content: (
        <div className={style.reviewSection} style={{ gap: '.75rem' }}>
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
        <div className={style.reviewSection} style={{ gap: '.75rem' }}>
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

  if (isLoading) return <SkeletonCoursesListPage />

  return (
    <Layout>
      <Tab tabs={tabs} type="list" />
    </Layout>
  )
}

export default CoursesListPage
