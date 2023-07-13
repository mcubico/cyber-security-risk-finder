/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useStateContext } from '../context'
import { getMeFn, loginUserFn } from '../services/auth-api.service'
import FormInput from '../components/molecules/FormInput'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0
  background-color: #f9d13e
  color: #2363eb
  font-weight: 500

  &:hover {
    background-color: #ebc22c
    transform: translateY(-2px)
  }
`

const LinkItem = styled(Link)`
  text-decoration: none
  color: #2363eb
  &:hover {
    text-decoration: underline
  }
`

const loginSchema = object({
  username: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
  //.min(8, 'Password must be more than 8 characters')
  //.max(32, 'Password must be less than 32 characters'),
})

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const from = ((location.state as any)?.from.pathname as string) || '/'

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const stateContext = useStateContext()

  // API Get Current Logged-in user
  const query = useQuery(['authUser'], getMeFn, {
    enabled: false,
    select: (apiResponse) => apiResponse.data,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data ?? null })
    },
  })

  //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: () => {
        query.refetch()
        toast.success('You successfully logged in')
        navigate('/risk-finder')
      },
      onError: (error: any) => {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          )
        } else {
          toast.error((error as any).response.data.message, {
            position: 'top-right',
          })
        }
      },
    }
  )

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // ? Executing the loginUser Mutation
    loginUser(values)
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box>
        <FormProvider {...methods}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete='off'
            maxWidth='27rem'
            width='100%'
            sx={{
              backgroundColor: '#e5e7eb',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name='username' label='Email Address' type='email' />
            <FormInput name='password' label='Password' type='password' />

            <LoadingButton
              variant='contained'
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type='submit'
              loading={isLoading}
            >
              Login
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  )
}

export default LoginPage
