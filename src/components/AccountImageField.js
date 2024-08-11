import React from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const AccountImageField = ({
  getRootProps,
  getInputProps,
  image,
  open,
  onDeleteImage,
}) => {
  return (
    <>
      <Box display='flex' alignItems='center' {...getRootProps()}>
        <Avatar
          src={image ? image.file : null}
          sx={{ width: '80px', height: '80px' }}
        />
        <input {...getInputProps()} />

        <Button
          type='button'
          size='small'
          variant='contained'
          onClick={open}
          sx={{ ml: 3 }}
        >
          アップロード
        </Button>

        {image && (
          <Button
            type='button'
            size='small'
            onClick={onDeleteImage}
            sx={{ ml: 1 }}
          >
            削除
          </Button>
        )}
      </Box>
    </>
  )
}

export default AccountImageField
