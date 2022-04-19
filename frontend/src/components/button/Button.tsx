import React from 'react'
import { outlinedButton, containedButton } from './types'
import style from './button.module.scss'

export const OutlinedButton: React.FC<outlinedButton> = ({
  children,
  color,
  outlineColor,
}) => {
  return (
    <div>
      <button
        className={style.btn}
        style={{ color, border: `1px solid ${outlineColor}` }}
      >
        {children}
      </button>
    </div>
  )
}

export const ContainedButton: React.FC<containedButton> = ({
  children,
  color,
  backgroundColor,
  paddingHorizontal,
  paddingVertical,
  margin,
}) => {
  return (
    <div>
      <button
        className={`${style.btn} ${style.btnContained}`}
        style={{
          color,
          backgroundColor: `${backgroundColor}`,
          padding: `${paddingVertical + ' ' + paddingHorizontal}`,
          margin: `${margin}`,
        }}
      >
        {children}
      </button>
    </div>
  )
}
