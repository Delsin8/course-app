import { useEffect, useState } from 'react'
import { client } from '../../api/client'
import { coursePopulated } from '../../types'
import style from '../../components/display-window/displayWindow.module.scss'
import PurchasedCourseItem from './PurchasedCourseItem'

const PurchasedCourses = () => {
  const [courses, setCourses] = useState<coursePopulated[]>([])
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
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
