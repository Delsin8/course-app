import style from './course.module.scss'
import { course2 } from '../../../types'
import Course from '../../components/course/Course'
import Layout from '../../layouts/Layout/Layout'

const data: course2[] = [
  {
    title: 'Python',
    description: 'asd',
    authors: ['asda'],
    price: 14.99,
    lessons: 10,
    duration: 210,
    rating: 4.5,
    votes: 831,
    students: 4812,
  },
  {
    title: 'React.js',
    description: 'asd',
    authors: ['asda'],
    price: 12,
    lessons: 21,
    duration: 415,
    rating: 4.1,
    votes: 81,
    students: 761,
  },
  {
    title: 'Drawing',
    description: 'asd',
    authors: ['asda'],
    price: 24.99,
    lessons: 30,
    duration: 810,
    rating: 4.7,
    votes: 154,
    students: 2000,
  },
]

const CoursesPage = () => {
  return (
    <Layout>
      {/* <div className={style.wrapper}> */}
      {/* filter items */}
      {/* filter */}
      {/* courses */}
      <div className={style.courses}>
        {data.map(d => (
          <Course key={d.price} {...d} />
        ))}
      </div>
      {/* </div> */}
    </Layout>
  )
}

export default CoursesPage
