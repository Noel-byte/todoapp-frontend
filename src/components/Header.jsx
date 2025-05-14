import { useContext } from 'react'
import AuthContext from './AuthContext'

export const Header = () => {
  const {message} = useContext(AuthContext)
  return (
        <div>
        <h1 className=' text-base sm:text-2xl md:text-3xl lg:text-4xl text-center bg-navbar py-6 text-white/20 font-titles'>{message}</h1>
        </div>
  )
}
