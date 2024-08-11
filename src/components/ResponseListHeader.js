import React from 'react'

import { useRouter } from 'next/router'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { useHistory } from '@/contexts/HistoryContext'

import Link from '@/components/Link'

const ResponseListHeader = ({ participant, onClickOpenMenu }) => {
  const router = useRouter()
  const { history } = useHistory()

  const handleClickBack = () => {
    if (history.length > 0 && history[0].split('?')[0] === '/account/direct') {
      router.back()
    } else {
      router.push('/account/direct')
    }
  }

  const ListItemButtonComponent = participant.thread.item
    ? ListItemButton
    : ListItem
  const ListItemButtonProps = participant.thread.item
    ? {
        component: Link,
        href: `/classifieds/p/${participant.thread.item.id}`,
        noLinkStyle: true,
        disableRipple: true,
      }
    : {}
  return (
    <List
      disablePadding
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <ListItem
        secondaryAction={
          <IconButton onClick={onClickOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        }
      >
        <ListItemIcon>
          <IconButton onClick={handleClickBack} aria-label='戻る'>
            <ArrowBackIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemText
          primary={participant.opponent.username}
          primaryTypographyProps={{
            component: Link,
            href: `/account/profile/${participant.opponent.id}`,
            color: 'text.primary',
            fontWeight: 700,
            noWrap: true,
          }}
          sx={{
            flex: 'none',
          }}
        />
      </ListItem>
      <Divider />
      <ListItemButtonComponent
        {...ListItemButtonProps}
        sx={{
          minHeight: '70px',
          '&.MuiListItemButton-root:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        }}
      >
        <ListItemAvatar>
          <Avatar
            variant='rounded'
            src={
              participant.thread.item && participant.thread.item.image
                ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${participant.thread.item.image}`
                : '/empty.png'
            }
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            participant.thread.item
              ? participant.thread.item.title
              : '削除された投稿'
          }
          primaryTypographyProps={{
            noWrap: true,
          }}
          secondary={
            participant.thread.item &&
            participant.thread.item.price &&
            participant.thread.item.price
          }
          secondaryTypographyProps={{
            noWrap: true,
            fontWeight: 700,
          }}
        ></ListItemText>
      </ListItemButtonComponent>
    </List>
  )
}

export default ResponseListHeader
