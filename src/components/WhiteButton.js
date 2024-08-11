import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const WhiteButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  borderColor: '#fff',
  boxShadow: theme.shadows[2],
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
    borderColor: '#fff',
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
    borderColor: '#fff',
  },
}))

export default WhiteButton
