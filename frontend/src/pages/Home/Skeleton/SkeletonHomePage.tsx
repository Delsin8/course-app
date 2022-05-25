import Layout from '../../../layouts/Layout/Layout'
import style from '../home.module.scss'
import {
  SkeletonRectangleCustom,
  SkeletonLine,
  SkeletonRectangle,
  SkeletonTitle,
} from '../../../components/skeleton/Skeleton'

const SkeletonHomePage = () => {
  return (
    <Layout>
      {/* hero sectino */}
      <SkeletonRectangleCustom height="50vh" width="100%" />
      <SkeletonTitle centered />
      <SkeletonLine tall />
      {/* courses */}
      <div style={{ margin: '2rem 0 0 0' }}></div>
      <SkeletonTitle />
      <div className={style.courses}>
        {[0, 1, 2, 3, 4, 5, 6].map(r => (
          <SkeletonRectangle key={`course_${r}`} course />
        ))}
      </div>
    </Layout>
  )
}

export default SkeletonHomePage
