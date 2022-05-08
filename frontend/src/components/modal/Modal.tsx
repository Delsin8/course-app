import { useState } from 'react'
import { OutlinedButton } from '../button/Button'
import style from './modal.module.scss'
import { modal } from './modal.types'
import ModalContainer from './ModalContainer'

const Modal: React.FC<modal> = ({ children, title, body }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={style.centered} onClick={() => setOpen(true)}>
        <OutlinedButton color="black" outlineColor="black" big>
          {children}
        </OutlinedButton>
      </div>
      {open && <ModalContainer title={title} setOpen={setOpen} body={body} />}
    </>
  )
}

export default Modal
