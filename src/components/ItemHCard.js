import React, { forwardRef, memo } from 'react'

import Image from 'next/image'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import BookmarkButton from './BookmarkButton'

const Root = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'disableUnderline' && prop !== 'isHighlight',
})(({ disableUnderline, isHighlight, theme }) => ({
  position: 'relative',
  userSelect: 'none',
  borderBottom: !disableUnderline ? `1px solid ${theme.palette.divider}` : 0,
  backgroundColor: !isHighlight ? '#fff' : '#e0efff',
}))

const ItemHCard = memo(
  forwardRef(
    (
      {
        item,
        InnerProps,
        BookmarkButtonProps,
        loading = false,
        disableUnderline = false,
        disablePadding = false,
        isFixed = false,
        isHighlight = false,
      },
      ref
    ) => (
      <Root
        disableUnderline={disableUnderline}
        isHighlight={isHighlight}
        ref={ref}
      >
        <Box
          {...InnerProps}
          sx={{
            display: 'flex',
            py: 2,
            px: !disablePadding ? { xs: 2, sm: 3, lg: 2 } : 0,
            color: 'inherit',
            textDecoration: 'none',
            '&:hover .title': {
              textDecorationLine: InnerProps && InnerProps.href && 'underline',
            },
          }}
        >
          {loading ? (
            <Skeleton
              variant='rectangular'
              sx={{
                borderRadius: (theme) => theme.shape.borderRadius,
                width: 95,
                minWidth: 95,
                height: 95,
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'relative',
                borderRadius: (theme) => theme.shape.borderRadius,
                overflow: 'hidden',
                width: 95,
                minWidth: 95,
                height: 95,
              }}
            >
              <Image
                src={
                  item.image
                    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${item.image}`
                    : '/empty.png'
                }
                width={95}
                height={95}
                alt={item.title}
                layout='fixed'
                priority={true}
                objectFit='cover'
                objectPosition='center center'
              />
              {isFixed && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 6,
                    left: 6,
                    display: 'span',
                    fontSize: '.675rem',
                    fontWeight: 700,
                    color: '#fff',
                    backgroundColor: (theme) => theme.palette.primary.light,
                    borderRadius: '7px',
                    p: '2px 6px',
                    boxShadow: (theme) => theme.shadows[2],
                  }}
                >
                  TOP
                </Box>
              )}
            </Box>
          )}

          <Box
            sx={{
              width: '100%',
              minWidth: 0,
              ml: 2,
            }}
          >
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

            <Typography
              variant='caption'
              color='text.secondary'
              noWrap
              mt={0.5}
            >
              {loading ? (
                <Skeleton width='40%' />
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
              <Typography mt={0.5}>
                <Skeleton width='20%' />
              </Typography>
            ) : (
              <>
                {item.price !== null && (
                  <Typography variant='body1' fontWeight={700} mt={0.3}>
                    {item.price}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
        {!loading && BookmarkButtonProps && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: { xs: 16, sm: 24, lg: 0 },
            }}
          >
            <BookmarkButton {...BookmarkButtonProps} />
          </Box>
        )}
      </Root>
    )
  )
)

ItemHCard.displayName = 'ItemHCard'

export default ItemHCard
