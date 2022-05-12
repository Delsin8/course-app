import { useContext, useState, createContext } from 'react'

export interface user {
  user: boolean
  setUser: (c: boolean) => void
}

export const UserContext = createContext<user>({
  user: false,
  setUser: () => {},
})
