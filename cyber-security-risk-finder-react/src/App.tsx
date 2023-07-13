import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRoutes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import routes from './router/index.router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const defaultTheme = createTheme()

const App = () => {
  const content = useRoutes(routes)

  return <>
    <CssBaseline enableColorScheme={true} />
    <ToastContainer />
    <ThemeProvider theme={defaultTheme}>
      {content}
    </ThemeProvider>
  </>
}

export default App
