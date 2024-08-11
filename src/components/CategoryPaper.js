import React from 'react'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import Link from './Link'

const Root = styled('div')(({ theme }) => ({
  padding: 16,
  height: '100px',
  position: 'relative',
  boxShadow: '0 5px 12px 0 rgb(0 0 0 / 10%)',
  borderRadius: theme.shape.borderRadius,
}))

const CategoryPaper = ({ label, image, categoryId, loading = false }) => {
  if (loading) {
    return (
      <Skeleton
        variant='rectangular'
        sx={{
          width: '100%',
          height: '100px',
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      />
    )
  }

  return (
    <Link
      href={`/classifieds/search/?category_id=${categoryId}`}
      noLinkStyle
      sx={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Root>
        <Typography fontWeight='bold'>{label}</Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: '15px',
            right: '15px',
            width: '40px',
            height: '40px',
          }}
        >
          <Box
            component='img'
            src={image}
            alt={label}
            width='100%'
            height='100%'
          />
        </Box>
      </Root>
    </Link>
  )
}

export default CategoryPaper
