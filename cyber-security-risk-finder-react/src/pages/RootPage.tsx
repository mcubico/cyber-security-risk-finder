import { Outlet } from "react-router-dom"
import Copyright from "../components/atoms/Copyright"
import Container from "@mui/material/Container"

const RootPage = () => (
  <>
    <Container id="content-page">
      <Outlet />
    </Container>
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </>
)

export default RootPage