import SkeletonAuthor from '../../../components/author/SkeletonAuthor'
import SkeletonComment from '../../../components/review/SkeletonReview'
import SkeletonSection from '../../../components/course/SkeletonSection'
import {
  SkeletonLine,
  SkeletonTitle,
} from '../../../components/skeleton/Skeleton'
import Layout from '../../../layouts/Layout/Layout'
import style from '../course.module.scss'

const SkeletonCoursePage = () => {
  return (
    <Layout>
      <div>
        <div className={`${style.infoSection} ${style.skeletonSpace}`}>
          <SkeletonTitle centered />
          <div className={style.description}>
            {[0, 1, 2, 3].map(d => (
              <SkeletonLine key={`desc_line_${d}`} />
            ))}
          </div>
        </div>
        {/* sections */}
        <div className={`${style.sections} ${style.skeletonSpace}`}>
          {[0, 1, 2].map(s => (
            <SkeletonSection key={`section_${s}`} />
          ))}
        </div>
        {/* authors */}
        <SkeletonTitle />
        <div className={`${style.authorSection} ${style.skeletonSpace}`}>
          {[0, 1, 2].map(a => (
            <SkeletonAuthor key={`author_${a}`} />
          ))}
        </div>
        {/* comments */}
        <SkeletonTitle centered />
        {[0, 1, 2].map(c => (
          <SkeletonComment key={`comment_${c}`} />
        ))}
      </div>
    </Layout>
  )
}

export default SkeletonCoursePage
