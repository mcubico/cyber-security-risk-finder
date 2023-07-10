import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import RootPage from "../../pages/RootPage"

const PrivateRoutes = () => {
  const authenticated = false
  //const { authenticated } = useContext(AuthContext)

  if (!authenticated)
    return <Navigate to={import.meta.env.VITE_LOGIN_ROUTE} replace />

  return <RootPage />
}

export default PrivateRoutes