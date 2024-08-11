import React from 'react'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Root = styled('div')({
  '&:last-child': {
    marginBottom: 24,
  },
})

const ItemSection = ({ title, children }) => (
  <Root>
    <Divider sx={{ my: 3 }} />
    {title && (
      <Typography variant='h6' fontWeight={700} mb={2}>
        {title}
      </Typography>
    )}
    <div>{children}</div>
  </Root>
)

export default ItemSection
