import style from './skeleton.module.scss'

interface skeletonTitle {
  centered?: boolean
  full?: boolean
}
export const SkeletonTitle: React.FC<skeletonTitle> = ({ centered, full }) => {
  return (
    <div
      className={`${style.skeleton} ${style.title} ${
        centered ? style.centered : ''
      } ${full ? style.full : ''}`}
    ></div>
  )
}

export const SkeletonLine = () => {
  return <div className={`${style.skeleton} ${style.line}`}></div>
}

export const SkeletonCircle = () => {
  return <div className={`${style.skeleton} ${style.circle}`}></div>
}

interface skeletonRectangle {
  filter?: boolean
  course?: boolean
}
export const SkeletonRectangle: React.FC<skeletonRectangle> = ({
  course,
  filter,
}) => {
  return (
    <div
      className={`${style.skeleton} ${course ? style.course : ''} ${
        filter ? style.filter : ''
      }`}
    ></div>
  )
}
