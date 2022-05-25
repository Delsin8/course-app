import {
  SkeletonCircle,
  SkeletonLine,
} from '../../components/skeleton/SkeletonMain'
import style from './section.module.scss'

const SkeletonSection = () => {
  return (
    <div className={style.skeleton} style={{ gap: '8px' }}>
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
