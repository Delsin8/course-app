export interface button {
  color: string
  paddingHorizontal?: string
  paddingVertical?: string
  margin?: string
  big?: boolean
}

export interface outlinedButton extends button {
  outlineColor: string
  glowing?: boolean
}

export interface containedButton extends button {
  backgroundColor: string
}
