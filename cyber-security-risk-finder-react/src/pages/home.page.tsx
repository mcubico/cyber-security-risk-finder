import { Box, Container, Paper, Typography } from '@mui/material'

const HomePage = () => (
  <Container maxWidth="xs">
    <Paper elevation={1}>
      <Box p={1} marginTop={10}>
        <Typography variant="h4" component="h1" marginLeft={1}>
          {import.meta.env.VITE_APP_TITLE}
        </Typography>
        <Typography component="p" marginTop={3} marginBottom={2} marginLeft={1}>
          Esta aplicación te permite encontrar riesgos de ciberseguridad por medio de palabras claves.
          Por favor autenticate para poder realizar búsquedas.
        </Typography>
      </Box>
    </Paper>
  </Container>
)

export default HomePage
