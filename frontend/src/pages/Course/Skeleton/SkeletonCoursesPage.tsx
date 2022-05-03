import SkeletonAuthor from '../../../components/author/SkeletonAuthor'
import SkeletonComment from '../../../components/comment/SkeletonComment'
import SkeletonSection from '../../../components/course/SkeletonSection'
import {
  SkeletonLine,
  SkeletonTitle,
  SkeletonRectangle,
} from '../../../components/Skeleton/Skeleton'
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
