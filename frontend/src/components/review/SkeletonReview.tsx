import {
  SkeletonCircle,
  SkeletonLine,
  SkeletonTitle,
} from '../skeleton/SkeletonMain'
import style from './review.module.scss'

const SkeletonReview = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.userSection}>
        <SkeletonCircle />
        <SkeletonTitle full />
      </div>
      <div style={{ flex: 1 }}>
        {[0, 1, 2, 3, 4].map(c => (
          <SkeletonLine key={`review_line${c}`} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonReview
