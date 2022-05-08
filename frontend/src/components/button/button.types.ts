export interface button {
  color: string
  padding?: string
  margin?: string
  big?: boolean
  children?: React.ReactNode
}

export interface outlinedButton extends button {
  outlineColor: string
  glowing?: boolean
}

export interface containedButton extends button {
  backgroundColor: string
}
