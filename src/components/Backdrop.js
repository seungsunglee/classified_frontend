import MuiBackdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const Backdrop = ({ open }) => {
  return (
    <MuiBackdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 1
      }}
    >
      <CircularProgress color='inherit' />
    </MuiBackdrop>
  )
}

export default Backdrop