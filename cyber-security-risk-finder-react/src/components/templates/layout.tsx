import { Outlet } from 'react-router-dom'
import Header from '../molecules/Header'
import Container from "@mui/material/Container"
import Copyright from '../atoms/Copyright'

const Layout = () => {
  return (
    <>
      <Header />
      <Container component="main">
        <Outlet />
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};

export default Layout;
