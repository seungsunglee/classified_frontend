import Box from '@mui/material/Box'

const ResponsiveContainer = ({ children, maxWidth, sx }) => (
  <Box
    sx={{
      maxWidth: { xs: '100%', ...maxWidth },
      m: '0 auto',
      px: { xs: 2, sm: 3 },
      ...sx,
    }}
  >
    {children}
  </Box>
)

export default ResponsiveContainer
