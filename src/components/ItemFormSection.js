import React from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const ItemFormSection = ({ title, subtitle, children, divider = false }) => {
  return (
    <div>
      <Box mb={2}>
        <Typography component='h2' variant='h6' fontWeight={700}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant='body2' color='text.secondary'>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Stack spacing={2}>{children}</Stack>

      {divider && (
        <Divider
          sx={{
            mt: 4,
            mb: 3,
          }}
        />
      )}
    </div>
  )
}

export default ItemFormSection
