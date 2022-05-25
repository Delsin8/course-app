import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './displayWindow.module.scss'

interface displayWindow {
  icon: JSX.Element
  link?: string
  component: JSX.Element
}

const DisplayWindow: React.FC<displayWindow> = ({ icon, component, link }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      tabIndex={1}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={style.wrapper}
    >
      {link ? (
        <Link to={link}>
          <div className={style.icon}>{icon}</div>
        </Link>
      ) : (
        <div className={style.icon}>{icon}</div>
      )}
      <div>{open && component}</div>
    </div>
  )
}

export default DisplayWindow
