import { SkeletonCircle, SkeletonLine } from '../skeleton/Skeleton'
import style from './course.module.scss'

const SkeletonCourse = () => {
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

export default SkeletonCourse
