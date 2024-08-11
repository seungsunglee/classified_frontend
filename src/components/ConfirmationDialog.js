import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const ConfirmationDialog = ({
  open,
  onClose,
  title,
  content,
  onClickDecideButton,
  decideButtonText,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          fontWeight: 700,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='text' color='inherit'>
          キャンセル
        </Button>
        <Button onClick={onClickDecideButton} variant='text' color='error'>
          {decideButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
