import { createTheme, ThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import router from './router/router'

const defaultTheme = createTheme();

const App = () => (
  <CssBaseline enableColorScheme={true}>
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </CssBaseline>
)

export default App
