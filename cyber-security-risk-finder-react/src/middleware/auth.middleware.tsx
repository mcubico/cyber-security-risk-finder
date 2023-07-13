import { useCookies } from 'react-cookie'
import { useQuery } from '@tanstack/react-query'
import { useStateContext } from '../context'
import { FC, ReactElement } from 'react'
import { getMeFn } from '../services/auth-api.service'
import FullScreenLoader from '../components/atoms/FullScreenLoader'

type AuthMiddlewareProps = {
  children: ReactElement
}

const AuthMiddleware: FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in'])
  const stateContext = useStateContext()

  const query = useQuery(['authUser'], () => getMeFn(), {
    enabled: !!cookies.logged_in,
    select: (apiResponse) => apiResponse.data,
    onSuccess: (data) => {
      console.log('cookies.logged_in', cookies.logged_in)

      stateContext.dispatch({ type: 'SET_USER', payload: data ?? null })
    },
  })

  if (query.isLoading && cookies.logged_in) {
    return <FullScreenLoader />
  }

  return children
}

export default AuthMiddleware
