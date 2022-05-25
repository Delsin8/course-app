import {
  SkeletonRectangleCustom,
  SkeletonTitle,
} from '../../../components/skeleton/SkeletonMain'
import Layout from '../../../layouts/Layout/Layout'

const SkeletonCoursesListPage = () => {
  return (
    <Layout>
      <div>
        <SkeletonTitle centered />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[0, 1, 2, 3, 4, 5, 6].map(r => (
            <SkeletonRectangleCustom
              key={`skeleton_rect_${r}`}
              height="100px"
              width="100%"
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SkeletonCoursesListPage
