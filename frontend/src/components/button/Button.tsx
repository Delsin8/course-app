import React from 'react'
import { outlinedButton, containedButton } from './button.types'
import style from './button.module.scss'

export const OutlinedButton: React.FC<outlinedButton> = ({
  children,
  color,
  outlineColor,
  glowing,
  big,
}) => {
  return (
    <div>
      <button
        className={`${style.btn} ${glowing ? style.glowing : ''} ${
          big ? style.big : ''
        }`}
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
  padding,
  margin,
}) => {
  return (
    <div>
      <button
        className={`${style.btn} ${style.btnContained}`}
        style={{
          color,
          backgroundColor: `${backgroundColor}`,
          padding: `${padding}`,
          margin: `${margin}`,
        }}
      >
        {children}
      </button>
    </div>
  )
}
