import React, { useState } from 'react'
import style from './displayWindow.module.scss'

interface displayWindow {
  icon: JSX.Element
  component: JSX.Element
}

const DisplayWindow: React.FC<displayWindow> = ({ icon, component }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      tabIndex={1}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={style.wrapper}
      // onClick={() => console.log(123)}
    >
      <div className={style.icon}>{icon}</div>
      <div>{open && component}</div>
      {/* {component} */}
    </div>
  )
}

export default DisplayWindow
