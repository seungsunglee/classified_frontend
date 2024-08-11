import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import api from '@/lib/api'
import { getSetPasswordSchema } from '@/lib/validations'

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

  const schema = getSetPasswordSchema()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
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
      await api.post('auth/user/reset-password-confirm/', data)
      toast('パスワードを設定しました')
      router.push('/')
    } catch (error) {
      setFieldErrors(error)
    }
  }

  if (!authUser || authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='パスワードを設定' />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='パスワードを設定' />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '450px' }}>
          <AuthPaper title='パスワードを設定'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <NonFieldErrors errors={nonFieldErrors} />
                <Controller
                  name='new_password'
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      type='password'
                      inputProps={{
                        placeholder: '新しいパスワード',
                      }}
                      autoFocus
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
                      inputProps={{
                        placeholder: '新しいパスワードを再入力',
                      }}
                      autoFocus
                      error={!!errors.re_new_password}
                      helperText={errors.re_new_password?.message}
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
                  パスワードを設定
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
