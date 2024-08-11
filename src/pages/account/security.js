import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import api from '@/lib/api'
import { getChangePasswordSchema } from '@/lib/validations'

import useAuthUser from '@/hooks/useAuthUser'
import useFieldErrors from '@/hooks/useFieldErrors'

import AccountLayout from '@/components/AccountLayout'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import NonFieldErrors from '@/components/NonFieldErrors'

const SecurityPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })

  const schema = getChangePasswordSchema()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      re_new_password: '',
    },
    resolver: yupResolver(schema),
  })

  const { nonFieldErrors, setNonFieldErrors, setFieldErrors } = useFieldErrors({
    setError,
  })

  const onSubmit = async (data) => {
    setNonFieldErrors(null)
    try {
      await api.post('auth/user/set-password/', data)
      reset()
      toast('パスワードを更新しました。')
    } catch (error) {
      setFieldErrors(error)
    }
  }

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='セキュリティ' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='セキュリティ' noindex />
      <AccountLayout>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            maxWidth: { xs: '100%', md: 500 },
            mx: { xs: 'auto', lg: 0 },
            mt: 2,
          }}
        >
          <Typography component='h1' variant='h5' fontWeight={700} mb={3}>
            セキュリティ
          </Typography>
          <Typography component='h2' fontWeight={700} mb={2}>
            パスワードを変更
          </Typography>
          <NonFieldErrors errors={nonFieldErrors} gutterBottom />
          <Stack spacing={3}>
            <Controller
              name='current_password'
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type='password'
                  label='パスワード'
                  error={!!errors.current_password}
                  helperText={errors.current_password?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <Controller
              name='new_password'
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type='password'
                  label='新しいパスワード'
                  error={!!errors.new_password}
                  helperText={errors.new_password?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <Controller
              name='re_new_password'
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type='password'
                  label='新しいパスワードを再入力'
                  error={!!errors.re_new_password}
                  helperText={errors.re_new_password?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <LoadingButton
              type='submit'
              variant='contained'
              size='large'
              loading={isSubmitting}
            >
              変更
            </LoadingButton>
          </Stack>
        </Box>
      </AccountLayout>
    </>
  )
}

export default SecurityPage
