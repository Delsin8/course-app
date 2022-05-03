import { SkeletonCircle, SkeletonLine } from '../Skeleton/Skeleton'
import style from './course.module.scss'

const SkeletonSection = () => {
  return (
    <div className={style.skeleton}>
      <SkeletonCircle />
      <div>
        {[0, 1, 2].map(s => (
          <SkeletonLine key={`section_line_${s}`} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonSection
