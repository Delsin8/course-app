import React, { useState } from 'react'
import style from './displayWindow.module.scss'

interface displayWindow {
  icon: JSX.Element
  component: JSX.Element
}

const DisplayWindow: React.FC<displayWindow> = ({ icon, component }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={style.wrapper}>
      <div onClick={() => setOpen(!open)} className={style.icon}>
        {icon}
      </div>
      {open && component}
    </div>
  )
}

export default DisplayWindow
