import {
  SkeletonCircle,
  SkeletonLine,
  SkeletonTitle,
} from '../Skeleton/Skeleton'
import style from './comment.module.scss'

const SkeletonComment = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.userSection}>
        <SkeletonCircle />
        <SkeletonTitle full />
      </div>
      <div style={{ flex: 1 }}>
        {[0, 1, 2, 3, 4].map(c => (
          <SkeletonLine key={`comment_line${c}`} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonComment
