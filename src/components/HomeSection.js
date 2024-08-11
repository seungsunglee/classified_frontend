import React from 'react'

import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Root = styled('div')({
  marginBottom: 80,
  '&:last-child': {
    marginBottom: 40,
  },
})

const HomeSection = ({ title, children }) => {
  return (
    <Root>
      <Typography variant='h5' fontWeight={700} mb={2}>
        {title}
      </Typography>
      {children}
    </Root>
  )
}

export default HomeSection
