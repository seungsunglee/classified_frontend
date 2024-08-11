import React, { useEffect, useMemo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'
import useMediaQuery from '@mui/material/useMediaQuery'

import api from '@/lib/api'
import { getItemDirectSchema } from '@/lib/validations'

import useFieldErrors from '@/hooks/useFieldErrors'

import CloseableDialogTitle from './CloseableDialogTitle'
import NonFieldErrors from './NonFieldErrors'

import SuccessIcon from '@/icons/Success'

const ItemDirectDialog = ({
  item,
  open,
  onClose,
  existingParticipant,
  mutateExistingParticipant,
}) => {
  const schema = getItemDirectSchema()

  const defaultValues = useMemo(() => ({ content: '' }), [])

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const { nonFieldErrors, setNonFieldErrors, setFieldErrors } = useFieldErrors({
    setError,
  })

  const onSubmit = async (data) => {
    setNonFieldErrors(null)

    data.item_id = item.id
    data.receiver_id = item.author.id

    try {
      const response = await api.post('direct/participants/', data)
      mutateExistingParticipant(response.data.id, false)
    } catch (error) {
      setFieldErrors(error)
    }
  }

  useEffect(() => {
    return () => {
      reset(defaultValues)
    }
  }, [reset, defaultValues])

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Dialog
      open={open}
      fullWidth
      fullScreen={mdDown}
      PaperProps={{
        sx: {
          maxWidth: mdDown ? '100%' : '490px',
        },
      }}
    >
      <CloseableDialogTitle onClose={onClose}>
        {!existingParticipant ? '投稿者にメッセージを送信する' : ''}
      </CloseableDialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        {!existingParticipant ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <NonFieldErrors errors={nonFieldErrors} gutterBottom />
                <Controller
                  name='content'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      multiline
                      minRows={10}
                      maxRows={10}
                      InputProps={{
                        placeholder: '詳細',
                      }}
                      error={!!errors.content}
                      helperText={
                        errors.content ? errors.content.message : null
                      }
                      {...field}
                    />
                  )}
                />

                <div>
                  <Typography variant='caption' color='textSecondary'>
                    送信することで当サイトの
                    <Link href='/help/article/1' target='_blank'>
                      利用規約
                    </Link>
                    、
                    <Link href='/help/article/2' target='_blank'>
                      プライバシーポリシー
                    </Link>
                    に同意するものとします。
                  </Typography>
                </div>

                <LoadingButton
                  type='submit'
                  variant='contained'
                  fullWidth
                  size='large'
                  loading={isSubmitting}
                >
                  送信する
                </LoadingButton>
              </Stack>
            </form>
          </>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              pt: { xs: 10, md: 2 },
            }}
          >
            <SuccessIcon
              sx={{
                fontSize: '60px',
                color: green[600],
              }}
            />
            <Typography fontWeight={700} mt={2}>
              メッセージを送信しました
            </Typography>
            <Typography variant='body2' color='text.secondary' mt={1}>
              投稿者からの返信をお待ちください。送信した内容は以下より確認できます。
            </Typography>
            <Button
              component={Link}
              href={`/account/direct/${existingParticipant}/`}
              variant='contained'
              fullWidth
              size='large'
              sx={{ mt: 3 }}
            >
              スレッドに移動する
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ItemDirectDialog
