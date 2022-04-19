export interface button {
  color: string
  paddingHorizontal?: string
  paddingVertical?: string
  margin?: string
}

export interface outlinedButton extends button {
  outlineColor: string
}

export interface containedButton extends button {
  backgroundColor: string
}
