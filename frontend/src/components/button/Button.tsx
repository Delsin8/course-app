import React from 'react'
import { outlinedButton, containedButton } from './button.types'
import style from './button.module.scss'

export const OutlinedButton: React.FC<outlinedButton> = ({
  children,
  color,
  outlineColor,
  big,
  margin,
  padding,
}) => {
  return (
    <div>
      <button
        className={`${style.btn} ${big ? style.big : ''}`}
        style={{
          color,
          border: `1px solid ${outlineColor}`,
          padding: `${padding}`,
          margin: `${margin}`,
        }}
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
  big,
}) => {
  return (
    <div>
      <button
        className={`${style.btn} ${style.btnContained} ${big ? style.big : ''}`}
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
