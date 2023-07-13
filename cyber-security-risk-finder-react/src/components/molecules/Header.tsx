/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { useStateContext } from '../../context'
import { useMutation } from '@tanstack/react-query'
import { logoutUserFn } from '../../services/auth-api.service'

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem
  color: #222
  font-weight: 500

  &:hover {
    transform: translateY(-2px)
  }
`

const Header = () => {
  const navigate = useNavigate()
  const stateContext = useStateContext()
  const user = stateContext.state.authUser

  const { mutate: logoutUser, isLoading } = useMutation(
    async () => await logoutUserFn(),
    {
      onSuccess: (data) => {
        console.debug('data', data)
        window.location.href = '/login'
      },
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          )
        } else {
          toast.error(error.response.data.message, {
            position: 'top-right',
          })
        }
      },
    }
  )

  const onLogoutHandler = async () => {
    logoutUser()
  }

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#fff' }}>

        <Container maxWidth='lg'>

          <Toolbar>

            <Typography
              variant='h6'
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer', color: '#222' }}
            >
              {import.meta.env.VITE_APP_TITLE}
            </Typography>

            <Box display='flex' sx={{ ml: 'auto' }}>
              {
                !user && (
                  <LoadingButton onClick={() => navigate('/login')}>
                    Login
                  </LoadingButton>
                )
              }
              {
                user && (
                  <>
                    <LoadingButton onClick={() => navigate('/risk-finder')} loading={isLoading}>
                      Risk Finder
                    </LoadingButton>
                    <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                      Logout
                    </LoadingButton>
                  </>
                )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
