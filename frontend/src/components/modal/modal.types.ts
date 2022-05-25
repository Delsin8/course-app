import { ReactNode } from 'react'
import { outlinedButton } from '../button/button.types'

export interface modal {
  title: string
  children?: ReactNode
  body: JSX.Element
}

export interface modalContainer extends modal {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
