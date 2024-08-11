import React from 'react'

import { useRouter } from 'next/router'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import Link from './Link'

export const getAccountMenuList = () => {
  return [
    {
      url: ['/account/manage-items'],
      IconComponent: ListAltOutlinedIcon,
      label: '投稿の管理',
    },
    {
      url: ['/account/bookmarks'],
      IconComponent: FavoriteBorderIcon,
      label: 'ブックマーク',
    },
    {
      url: ['/account/direct', '/account/direct/[id]'],
      IconComponent: MailOutlineIcon,
      label: 'メッセージ',
    },
    {
      url: ['/account/payment-history'],
      IconComponent: ReceiptOutlinedIcon,
      label: 'お支払い履歴',
    },
    {
      url: ['/account/settings'],
      IconComponent: SettingsOutlinedIcon,
      label: 'アカウント設定',
    },
    {
      url: ['/account/security'],
      IconComponent: ShieldOutlinedIcon,
      label: 'セキュリティ',
    },
  ]
}

const AccountMenu = () => {
  const { pathname } = useRouter()
  const accountMenuList = getAccountMenuList()
  return (
    <List>
      {accountMenuList.map((item, index) => (
        <ListItemButton
          key={index}
          component={Link}
          href={item.url[0]}
          noLinkStyle
        >
          <ListItemIcon sx={{ minWidth: 48 }}>
            <item.IconComponent
              color={
                pathname === item.url[0] || pathname === item.url[1]
                  ? 'primary'
                  : 'action'
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              color:
                pathname === item.url[0] || pathname === item.url[1]
                  ? 'primary'
                  : 'inherit',
            }}
          />
        </ListItemButton>
      ))}
    </List>
  )
}

export default AccountMenu
