import { Outlet } from "react-router-dom"
import Copyright from "../components/atoms/Copyright"

const RootPage = () => (
  <>
    <div id="content-page">
      <Outlet />
    </div>
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </>
)

export default RootPage