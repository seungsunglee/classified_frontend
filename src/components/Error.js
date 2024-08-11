import Typography from '@mui/material/Typography'

import CalcContainer from './CalcContainer'

const statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

const Error = ({ statusCode }) => {
  const title = statusCodes[statusCode] || 'An unexpected error has occurred'
  return (
    <CalcContainer>
      <Typography variant='h6' fontWeight={700} textAlign='center' mb={2}>
        お探しのページを表示できません
      </Typography>
      <Typography textAlign='center' color='text.secondary'>
        {statusCode ? `${statusCode} - ${title}` : title}
      </Typography>
    </CalcContainer>
  )
}

export default Error
