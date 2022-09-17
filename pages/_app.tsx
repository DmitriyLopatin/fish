import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Context } from '../app/utils/context'
import { AuthService } from '../app/services/AuthService'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const [userData, setUserData] = useState()

  useEffect(() => {
    AuthService.getCurrentUser()
      .then(response => {
        setUserData(response.data)
      })
      .catch(err => { console.log(err); router.push('/') })
  }, [])

  const updateUserData = (updatedUserData: any) => {
    setUserData(updatedUserData)
  }
  return (
    <Context.Provider value={{ userData, updateUserData }}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

export default MyApp
