import { useEffect, useState } from 'react'
import { client } from './api/client'

const useCheck = (): [boolean, (u: boolean) => void] => {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(false)
        return
      }

      const url = '/api/users/check'
      const res = await client.get(url, { headers: { 'x-api-key': token } })
      if (res.data?.valid === true) {
        setUser(true)
        return
      }
      setUser(false)
      return
    }

    checkUser()
  }, [])

  return [user, setUser]
}

export default useCheck
