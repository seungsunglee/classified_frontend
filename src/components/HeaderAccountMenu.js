import React from 'react'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Link from './Link'

const getAccountMenuList = () => {
  return [
    {
      url: '/account/manage-items',
      IconComponent: ListAltOutlinedIcon,
      label: '投稿の管理',
    },
    {
      url: '/account/payment-history',
      IconComponent: ReceiptOutlinedIcon,
      label: 'お支払い履歴',
    },
    {
      url: '/account/settings',
      IconComponent: SettingsOutlinedIcon,
      label: 'アカウント設定',
    },
    {
      url: '/account/security',
      IconComponent: ShieldOutlinedIcon,
      label: 'セキュリティ',
    },
  ]
}

const HeaderAccountMenu = ({ open, anchorEl, authUser, onClose, onLogout }) => {
  const accountMenuList = getAccountMenuList()

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={onClose}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        sx: {
          minWidth: '230px',
        },
      }}
    >
      <MenuItem
        component={Link}
        href={`/account/profile/${authUser && authUser.id}`}
        noLinkStyle
      >
        <ListItemIcon
          sx={{
            minWidth: '52px !important',
          }}
        >
          <Avatar
            src={
              authUser && authUser.image && authUser.image.file
                ? authUser.image.file
                : null
            }
          />
        </ListItemIcon>
        <ListItemText
          primary={authUser && authUser.username}
          primaryTypographyProps={{ fontWeight: 700, noWrap: true }}
          secondary='プロフィールを見る'
          secondaryTypographyProps={{ noWrap: true, variant: 'caption' }}
        />
      </MenuItem>
      <Divider />
      {accountMenuList.map((menu, index) => (
        <MenuItem key={index} component={Link} href={menu.url} noLinkStyle>
          <ListItemIcon>
            <menu.IconComponent fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary={menu.label}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText
          primary='ログアウト'
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>
    </Menu>
  )
}

export default HeaderAccountMenu
