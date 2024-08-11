import React from 'react'

import LazyLoad from 'react-lazyload'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import Link from './Link'

const Placeholder = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '56.25%',
  backgroundColor: theme.palette.grey[100],
}))

const LocationCard = ({ label, image, locationId, loading = false }) => {
  if (loading) {
    return (
      <Skeleton
        variant='rectangular'
        sx={{
          width: '100%',
          pt: 'calc(56.25% + 56px)',
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      />
    )
  }

  return (
    <Link
      href={`/classifieds/search/?location_id=${locationId}`}
      noLinkStyle
      sx={{
        textDecoration: 'none',
      }}
    >
      <Card
        elevation={0}
        sx={{
          boxShadow: '0 5px 12px 0 rgb(0 0 0 / 10%)',
        }}
      >
        <LazyLoad height='100%' once placeholder={<Placeholder />}>
          <CardMedia
            image={image}
            sx={{
              width: '100%',
              pt: '56.25%',
            }}
          />
        </LazyLoad>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'cnter',
            p: 2,
          }}
        >
          <Typography fontWeight='bold' noWrap>
            {label}
          </Typography>
          <ChevronRightIcon
            color='action'
            sx={{
              ml: 'auto',
            }}
          />
        </Box>
      </Card>
    </Link>
  )
}

export default LocationCard
