import React from 'react'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import api from '@/lib/api'
import { getLoginSchema } from '@/lib/validations'

import useAuthUser from '@/hooks/useAuthUser'
import useFieldErrors from '@/hooks/useFieldErrors'

import AuthPaper from '@/components/AuthPaper'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import NonFieldErrors from '@/components/NonFieldErrors'
import ResponsiveContainer from '@/components/ResponsiveContainer'

const LoginPage = () => {
  const router = useRouter()

  const redirectTo = router.query.next ? router.query.next : '/'
  const { authUser, mutateAuthUser } = useAuthUser({
    redirectTo,
    redirectIfFound: true,
  })

  const schema = getLoginSchema()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const { nonFieldErrors, setNonFieldErrors, setFieldErrors } = useFieldErrors({
    setError,
  })

  const onSubmit = async (data) => {
    setNonFieldErrors(null)
    try {
      await mutateAuthUser(
        api.post('auth/login/', data).then((response) => response.data)
      )
      toast('ログインしました')
    } catch (error) {
      setFieldErrors(error)
    }
  }

  if (!authUser || authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='ログイン' />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='ログイン' />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '450px' }}>
          <AuthPaper title='ログイン'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
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
                      autoComplete='email'
                      autoFocus
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='password'
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      type='password'
                      inputProps={{
                        placeholder: 'パスワード',
                      }}
                      autoComplete='current-password'
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <div>
                  <Link href='/reset-password' variant='caption'>
                    パスワードを忘れた場合
                  </Link>
                </div>
                <LoadingButton
                  type='submit'
                  size='large'
                  loading={isSubmitting}
                >
                  ログイン
                </LoadingButton>
                <Typography variant='caption' align='center'>
                  アカウントをお持ちでないですか？
                  <Link href='/signup'> 会員登録</Link>
                </Typography>
              </Stack>
            </form>
          </AuthPaper>
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default LoginPage
