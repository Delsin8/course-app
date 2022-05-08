import { useEffect, useState } from 'react'
import { client } from '../../api/client'
import { course } from '../../types'
import style from '../../components/display-window/displayWindow.module.scss'
import PurchasedCourseItem from './PurchasedCourseItem'

const PurchasedCourses = () => {
  const [courses, setCourses] = useState<course[]>([])
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      const url = 'http://localhost:5000/api/purchased-courses'
      const token = localStorage.getItem('token')

      const response = await client.get(url, {
        headers: { 'x-api-key': token },
      })
      if (response.status === 200 && response.data) {
        setCourses(response.data)
      }
    }

    fetchPurchasedCourses()
  }, [])

  return (
    <div className={style.container}>
      {courses.map(c => (
        <PurchasedCourseItem course={c} key={`purchased_course_${c._id}`} />
      ))}
    </div>
  )
}

export default PurchasedCourses
