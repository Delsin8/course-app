import {
  SkeletonLine,
  SkeletonRectangleCustom,
  SkeletonTitle,
} from '../../../components/skeleton/SkeletonMain'
import Layout from '../../../layouts/Layout/Layout'
import style from '../lesson.module.scss'

export const SkeletonLessonPage = () => {
  return (
    <Layout big>
      <div className={style.wrapper}>
        <SkeletonRectangleCustom height="40vh" width="100%" />
        <SkeletonRectangleCustom height="40vh" width="100%" />
      </div>
      <SkeletonQuestions />
    </Layout>
  )
}

export const SkeletonQuestions = () => {
  return (
    <div>
      <SkeletonTitle />
      {[0, 1, 2].map(s => (
        <div key={`q_${s}`}>
          <SkeletonTitle />
          <SkeletonLine />
        </div>
      ))}
    </div>
  )
}

export const SkeletonAnswer = () => {
  return (
    <div>
      <SkeletonTitle />
      {[0, 1].map(s => (
        <SkeletonLine key={`answer_${s}`} />
      ))}
    </div>
  )
}

export const SkeletonAnswers = () => {
  return (
    <div>
      {[0, 1, 3].map(s => (
        <SkeletonAnswer key={`a_${s}`} />
      ))}
    </div>
  )
}
