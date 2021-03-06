import Title from '../typography/Title'
import style from './modal.module.scss'
import { modalContainer } from './modal.types'
import { IoIosClose } from 'react-icons/io'

const ModalContainer: React.FC<modalContainer> = ({ title, body, setOpen }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.header}>
          <Title centered noMarginBottom noMarginTop>
            {title}
          </Title>
          <span className={style.closeIcon} onClick={() => setOpen(false)}>
            <IoIosClose size={28} />
          </span>
        </div>
        <div className={style.body}>{body}</div>
      </div>
    </div>
  )
}

export default ModalContainer
