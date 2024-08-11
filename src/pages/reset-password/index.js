import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import api from '@/lib/api'
import { getResetPasswordSchema } from '@/lib/validations'

import useAuthUser from '@/hooks/useAuthUser'
import useFieldErrors from '@/hooks/useFieldErrors'

import AuthPaper from '@/components/AuthPaper'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import NonFieldErrors from '@/components/NonFieldErrors'
import ResponsiveContainer from '@/components/ResponsiveContainer'

const ResetPasswordPage = () => {
  const router = useRouter()

  const { authUser } = useAuthUser({ redirectTo: '/', redirectIfFound: true })

  const schema = getResetPasswordSchema()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  })

  const { nonFieldErrors, setNonFieldErrors, setFieldErrors } = useFieldErrors({
    setError,
  })

  const onSubmit = async (data) => {
    setNonFieldErrors(null)
    try {
      await api.post('auth/user/reset-password/', data)
      toast('確認メールを送信しました')
      router.push('/')
    } catch (error) {
      setFieldErrors(error)
    }
  }

  if (!authUser || authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='パスワードをリセット' />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='パスワードをリセット' />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '450px' }}>
          <AuthPaper title='パスワードをリセット'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                <NonFieldErrors errors={nonFieldErrors} />
                <Controller
                  name='username'
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      type='email'
                      inputProps={{
                        placeholder: 'メールアドレス',
                      }}
                      autoFocus
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <LoadingButton
                  type='submit'
                  size='large'
                  loading={isSubmitting}
                >
                  パスワードをリセット
                </LoadingButton>
              </Stack>
            </form>
          </AuthPaper>
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default ResetPasswordPage
