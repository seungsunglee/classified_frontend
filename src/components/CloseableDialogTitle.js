import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

const CloseableDialogTitle = ({ children, onClose }) => (
  <DialogTitle sx={{ fontWeight: 700 }}>
    {children}
    <IconButton
      onClick={onClose}
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
)

export default CloseableDialogTitle
