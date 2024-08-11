import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import api from '@/lib/api'
import { getSignupSchema } from '@/lib/validations'

import useAuthUser from '@/hooks/useAuthUser'
import useFieldErrors from '@/hooks/useFieldErrors'

import AuthPaper from '@/components/AuthPaper'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import NonFieldErrors from '@/components/NonFieldErrors'
import ResponsiveContainer from '@/components/ResponsiveContainer'

const SignupPage = () => {
  const { authUser, mutateAuthUser } = useAuthUser({
    redirectTo: '/',
    redirectIfFound: true,
  })

  const schema = getSignupSchema()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
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
        api.post('auth/user/', data).then((response) => response.data)
      )
      toast('会員登録が完了しました')
    } catch (error) {
      setFieldErrors(error)
    }
  }

  if (!authUser || authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='会員登録' />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='会員登録' />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '450px' }}>
          <AuthPaper title='会員登録'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <NonFieldErrors errors={nonFieldErrors} />
                <Controller
                  name='email'
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
                <Controller
                  name='username'
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      inputProps={{
                        placeholder: 'ニックネーム',
                      }}
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
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <Typography variant='caption' color='text.secondary'>
                  登録することで当サイトの
                  <Link href='/help/article/1' target='_blank'>
                    利用規約
                  </Link>
                  、
                  <Link href='/help/article/2' target='_blank'>
                    プライバシーポリシー
                  </Link>
                  に同意するものとします。
                </Typography>
                <LoadingButton
                  type='submit'
                  size='large'
                  loading={isSubmitting}
                >
                  会員登録
                </LoadingButton>
                <Typography variant='caption' align='center'>
                  アカウントをお持ちですか？
                  <Link href='/login'> ログイン</Link>
                </Typography>
              </Stack>
            </form>
          </AuthPaper>
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default SignupPage
