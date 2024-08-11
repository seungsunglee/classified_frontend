import Box from '@mui/material/Box'

const CalcContainer = ({ children }) => {
  return (
    <Box
      sx={{
        height: {
          xs: 'calc(100vh - 195px)',
          sm: 'calc(100vh - 205px)',
          lg: 'calc(100vh - 175px)',
        },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default CalcContainer
