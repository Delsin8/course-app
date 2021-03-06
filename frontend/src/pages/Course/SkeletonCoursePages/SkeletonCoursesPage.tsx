import { SkeletonRectangle } from '../../../components/skeleton/SkeletonMain'
import Layout from '../../../layouts/Layout/Layout'
import style from '../course.module.scss'

const SkeletonCoursesPage = () => {
  return (
    <Layout big>
      <div className={style.mainSection}>
        {/* filter */}
        <div className={style.filterWrapper}>
          <SkeletonRectangle filter />
        </div>
        {/* courses */}
        <div className={style.courses}>
          {[0, 1, 2, 3, 4, 5, 6].map(r => (
            <SkeletonRectangle key={`course_${r}`} course />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SkeletonCoursesPage
