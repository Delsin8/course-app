import { ReactNode } from 'react'
import { outlinedButton } from '../button/button.types'

interface modalBasic {
  title: string
  children?: ReactNode
  body: JSX.Element
}

export interface modal extends modalBasic {
  //   colo
}

export interface modalContainer extends modalBasic {
  //   body: ReactNode
  // footer
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
