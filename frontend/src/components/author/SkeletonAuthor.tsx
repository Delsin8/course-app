import {
  SkeletonCircle,
  SkeletonLine,
  SkeletonTitle,
} from '../Skeleton/Skeleton'
import style from './author.module.scss'

const SkeletonAuthor = () => {
  return (
    <div>
      <div className={style.mainSection}>
        <SkeletonCircle />
        <div>
          <SkeletonTitle full />
          <SkeletonLine />
          <SkeletonLine />
        </div>
      </div>
      {[0, 1, 2, 3].map(s => (
        <SkeletonLine key={`author_line${s}`} />
      ))}
    </div>
  )
}

export default SkeletonAuthor
