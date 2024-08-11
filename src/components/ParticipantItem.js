import React from 'react'

import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const UnreadDot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '12px',
  minWidth: '12px',
  height: '12px',
  borderRadius: '50%',
  marginLeft: '8px',
  marginRight: '8px',
}))

const ParticipantItem = ({ participant, InnerProps, loading = false }) => (
  <ListItemButton
    {...InnerProps}
    sx={{
      color: 'inherit',
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      minHeight: '81px',
      px: { xs: 2, sm: 3, lg: 2 },
      '&.MuiListItemButton-root:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
      },
    }}
  >
    <ListItemAvatar
      sx={{
        minWidth: '72px',
      }}
    >
      {loading ? (
        <Skeleton
          variant='rectangular'
          sx={{
            borderRadius: (theme) => theme.shape.borderRadius,
            width: '56px',
            height: '56px',
          }}
        />
      ) : (
        <Avatar
          variant='rounded'
          src={
            participant.thread.item && participant.thread.item.image
              ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${participant.thread.item.image}`
              : '/empty.png'
          }
          sx={{
            width: '56px',
            height: '56px',
          }}
        />
      )}
    </ListItemAvatar>
    <ListItemText disableTypography>
      <Typography variant='body2' fontWeight={700} noWrap>
        {loading ? <Skeleton width='20%' /> : participant.opponent.username}
      </Typography>
      <Typography variant='body2' noWrap>
        {loading ? (
          <Skeleton />
        ) : participant.thread.item ? (
          participant.thread.item.title
        ) : (
          '削除された投稿'
        )}
      </Typography>
      <Typography variant='body2' color='text.secondary' noWrap>
        {loading ? <Skeleton width='50%' /> : participant.last_response.content}
      </Typography>
    </ListItemText>

    {!loading && !participant.is_read && <UnreadDot />}
  </ListItemButton>
)

export default ParticipantItem
