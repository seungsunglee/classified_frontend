import React, { memo } from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import Link from './Link'

const ItemAuthor = memo(({ item, children }) => (
  <Card
    elevation={children ? 3 : 0}
    sx={{
      border: (theme) =>
        children ? `1px solid ${theme.palette.divider}` : 'none',
    }}
  >
    <CardHeader
      component={Link}
      href={`/account/profile/${item.author.id}`}
      noLinkStyle
      avatar={
        <Avatar
          src={item.author.image ? item.author.image.file : null}
          alt={item.author.username}
          sx={{ width: 48, height: 48 }}
        />
      }
      title={item.author.username}
      titleTypographyProps={{
        noWrap: true,
        fontWeight: 700,
      }}
      subheader={`${item.author.items}件の投稿`}
      subheaderTypographyProps={{
        noWrap: true,
      }}
      action={<ArrowForwardIosIcon color='action' />}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        p: children ? 2 : 0,
        '& .MuiCardHeader-content': {
          overflow: 'hidden',
        },
        '& .MuiCardHeader-action': {
          alignSelf: 'center',
          mr: 0,
        },
      }}
    />
    {children && <CardContent>{children}</CardContent>}
  </Card>
))

ItemAuthor.displayName = 'ItemAuthor'

export default ItemAuthor
