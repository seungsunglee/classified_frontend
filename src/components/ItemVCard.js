import LazyLoad from 'react-lazyload'

import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Placeholder = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  width: '100%',
  height: '100%',
  paddingTop: '100%',
  borderRadius: theme.shape.borderRadius,
}))

const ItemVCard = ({ InnerProps, item, loading = false }) => (
  <Box
    {...InnerProps}
    sx={{
      position: 'relative',
      userSelect: 'none',
      textDecoration: 'none',
      color: 'inherit',
      '&:hover .title': {
        textDecorationLine: InnerProps && 'underline',
      },
    }}
  >
    {loading ? (
      <Skeleton
        variant='rectangular'
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          width: '100%',
          pt: '100%',
        }}
      />
    ) : (
      <LazyLoad height='100%' once placeholder={<Placeholder />}>
        <CardMedia
          image={
            item.image
              ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${item.image}`
              : '/empty.png'
          }
          alt={item.title}
          sx={{
            borderRadius: (theme) => theme.shape.borderRadius,
            width: '100%',
            pt: '100%',
          }}
        />
      </LazyLoad>
    )}
    <Box pt={1}>
      <Typography
        className='title'
        variant='body2'
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
        }}
      >
        {loading ? <Skeleton /> : item.title}
      </Typography>

      <Typography variant='caption' color='text.secondary' noWrap mt='2px'>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <span>{item.location}</span>
            <Box component='span' px={0.5}>
              ·
            </Box>
            <span>{item.category}</span>
          </>
        )}
      </Typography>

      {loading ? (
        <Typography variant='body1'>
          <Skeleton sx={{ width: '40%' }} />
        </Typography>
      ) : (
        <>
          {item.price !== null && (
            <Typography variant='body1' fontWeight={700}>
              {item.price}
            </Typography>
          )}
        </>
      )}
    </Box>
  </Box>
)

export default ItemVCard
