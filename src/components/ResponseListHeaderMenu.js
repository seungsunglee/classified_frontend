import React from 'react'

import BlockIcon from '@mui/icons-material/Block'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const ChatHeaderMenu = ({
  open,
  anchorEl,
  onClose,
  onClickOpenDeleteParticipantDialog,
  onClickOpenBlockDialog,
  blocked,
}) => {
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={onClose}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={onClickOpenDeleteParticipantDialog}>
        <ListItemIcon>
          <DeleteOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary='スレッドを削除'
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>
      <MenuItem onClick={onClickOpenBlockDialog}>
        <ListItemIcon>
          <BlockIcon />
        </ListItemIcon>
        <ListItemText
          primary={blocked ? 'ブロックを解除' : 'ブロック'}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>
    </Menu>
  )
}

export default ChatHeaderMenu
