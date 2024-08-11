import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

const WhiteIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.action.hover}`,
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}))

export default WhiteIconButton
