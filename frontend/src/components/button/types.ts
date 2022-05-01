export interface button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  padding?: string
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
