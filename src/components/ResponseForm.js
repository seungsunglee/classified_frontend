import React, { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingButton from '@mui/lab/LoadingButton'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'

import api from '@/lib/api'

const ResponseForm = ({ participant, addNewResponse, blocked, sx }) => {
  const [openForm, setOpenForm] = useState(false)

  const defaultValues = { content: '' }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues })

  const onSubmit = async (data) => {
    if (data.content.trim() === '') return

    data.thread_id = participant.thread.id
    data.receiver_id = participant.opponent.id

    try {
      const response = await api.post(`direct/responses/`, data)
      addNewResponse(response.data.response)
    } catch (error) {
      toast('エラーが発生しました')
    }

    setOpenForm(false)

    reset(defaultValues)
  }
  return (
    <Box sx={sx}>
      {!blocked && (
        <>
          {openForm ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <ListItem disableGutters disablePadding alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText disableTypography>
                  <Controller
                    name='content'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={6}
                        {...field}
                      />
                    )}
                  />
                </ListItemText>
              </ListItem>
              <Box
                sx={{
                  pl: '56px',
                  mt: '12px',
                }}
              >
                <LoadingButton
                  variant='contained'
                  type='submit'
                  loading={isSubmitting}
                >
                  送信
                </LoadingButton>
                <Button
                  variant='outlined'
                  type='button'
                  disabled={isSubmitting}
                  onClick={() => setOpenForm(false)}
                  sx={{
                    ml: 1,
                  }}
                >
                  キャンセル
                </Button>
              </Box>
            </form>
          ) : (
            <Box pl='56px'>
              <Button variant='outlined' onClick={() => setOpenForm(true)}>
                メッセージを作成
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default ResponseForm
