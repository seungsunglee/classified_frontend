import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const AuthPaper = ({ title, children }) => (
  <Paper elevation={4} sx={{ p: 3, mt: { xs: 1, md: 4 } }}>
    <Typography component='h1' variant='h5' fontWeight={700} mb={3}>
      {title}
    </Typography>
    {children}
  </Paper>
)

export default AuthPaper
