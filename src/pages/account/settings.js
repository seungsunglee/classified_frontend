import React, { useState } from 'react'

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
import { getSettingsSchema } from '@/lib/validations'

import useAccountImageField from '@/hooks/useAccountImageField'
import useAuthUser from '@/hooks/useAuthUser'
import useBackdrop from '@/hooks/useBackdrop'
import useFieldErrors from '@/hooks/useFieldErrors'

import AccountImageField from '@/components/AccountImageField'
import AccountLayout from '@/components/AccountLayout'
import Backdrop from '@/components/Backdrop'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import NonFieldErrors from '@/components/NonFieldErrors'

const SettingsPage = () => {
  const router = useRouter()
  const { authUser, mutateAuthUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })
  const [sentActivation, setSentActivation] = useState(false)

  const { open: openBackdrop, setOpen: setOpenBackdrop } = useBackdrop()

  const schema = getSettingsSchema()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {
    getRootProps,
    getInputProps,
    image,
    deletedImage,
    open,
    handleDeleteImage,
  } = useAccountImageField({ authUser })

  const { nonFieldErrors, setNonFieldErrors, setFieldErrors } = useFieldErrors({
    setError,
  })

  const onSubmit = async (data) => {
    const formData = new FormData()

    for (let key of Object.keys(data)) {
      formData.append(key, data[key])
    }

    if (image) {
      formData.append('file', image)
    }

    if (deletedImage) {
      formData.append('deleted_image', true)
    }

    setNonFieldErrors(null)

    try {
      const response = await api.put('auth/user/me/', formData)
      mutateAuthUser({ isAuthenticated: true, ...response.data }, false)
      toast('更新が完了しました')
      window.scrollTo(0, 0)
    } catch (error) {
      setFieldErrors(error)
    }
  }

  const handleClickActivateEmail = async () => {
    setOpenBackdrop(true)
    try {
      await api.post('auth/user/resend-activation/', { email: authUser.email })
      toast('確認メールを送信しました')
      setSentActivation(true)
    } catch (error) {
      toast('エラーが発生しました')
    }
    setOpenBackdrop(false)
  }

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='アカウント設定' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='アカウント設定' noindex />
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
            アカウント設定
          </Typography>
          <NonFieldErrors errors={nonFieldErrors} gutterBottom />
          <Stack spacing={3}>
            <AccountImageField
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              image={image}
              open={open}
              onDeleteImage={handleDeleteImage}
            />
            <Controller
              name='username'
              control={control}
              defaultValue={authUser.username ? authUser.username : ''}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label='ニックネーム'
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              defaultValue={authUser.email ? authUser.email : ''}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type='email'
                  label='メールアドレス'
                  error={!!errors.email}
                  helperText={
                    errors.email ? (
                      errors.email.message
                    ) : !authUser.email_confirmed ? (
                      <>
                        このメールアドレスは認証されていません。
                        {!sentActivation && (
                          <Box
                            component='span'
                            onClick={handleClickActivateEmail}
                            sx={{
                              color: 'primary.main',
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            認証リンクを再送する
                          </Box>
                        )}
                      </>
                    ) : null
                  }
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <Controller
              name='introduction'
              control={control}
              defaultValue={authUser.introduction ? authUser.introduction : ''}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label='自己紹介'
                  multiline
                  minRows={3}
                  error={!!errors.introduction}
                  helperText={errors.introduction?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <Controller
              name='website'
              control={control}
              defaultValue={authUser.website ? authUser.website : ''}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label='ウェブサイト'
                  error={!!errors.website}
                  helperText={errors.website?.message}
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
              更新
            </LoadingButton>
          </Stack>
        </Box>
      </AccountLayout>

      <Backdrop open={openBackdrop} />
    </>
  )
}

export default SettingsPage
