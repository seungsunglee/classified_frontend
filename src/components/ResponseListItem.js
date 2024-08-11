import React from 'react'

import { format } from 'date-fns'

import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.action.selected}`,
  paddingTop: '16px',
  paddingBottom: '32px',
  '&:last-child': {
    borderTop: 'none',
  },
}))

const ResponseListItem = ({ response }) => {
  return (
    <Root>
      <ListItem disableGutters disablePadding>
        <ListItemAvatar>
          <Avatar
            src={
              response.sender.image && response.sender.image.file
                ? response.sender.image.file
                : null
            }
          />
        </ListItemAvatar>
        <ListItemText
          primary={response.sender.username}
          primaryTypographyProps={{
            fontWeight: 700,
          }}
          secondary={format(new Date(response.created_at), 'yyyy/MM/dd HH:mm')}
        />
      </ListItem>
      <Typography
        whiteSpace='pre-wrap'
        sx={{
          pl: '56px',
          mt: '4px',
        }}
      >
        {response.content}
      </Typography>
    </Root>
  )
}

export default ResponseListItem
