import { useCookies } from 'react-cookie'
import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStateContext } from '../../context'
import { getMeFn } from '../../services/auth-api.service'
import FullScreenLoader from '../atoms/FullScreenLoader'

const AuthenticationGuard = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in'])
  const location = useLocation()
  const stateContext = useStateContext()

  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(['authUser'], getMeFn, {
    retry: 1,
    select: (apiResponse) => apiResponse.data,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data ?? null })
    },
  })

  const loading = isLoading || isFetching

  if (loading) {
    return <FullScreenLoader />
  }

  return (cookies.logged_in || user) &&
    allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default AuthenticationGuard
