import Layout from '../../layouts/Layout/Layout'
import style from './lesson.module.scss'

const LessonPage = () => {
  return (
    <Layout>
      <div className={style.wrapper}>
        {/* video */}
        <div>
          <div className={style.videoWrapper}>
            <video controls height={400} width={800}>
              <source src="/videos/1.mkv" />
            </video>
          </div>
          {/* question */}
          <div className={style.questionsWrapper}></div>
        </div>
        {/* section */}
        <div className={style.lessonsWrapper}></div>
      </div>
    </Layout>
  )
}

export default LessonPage
