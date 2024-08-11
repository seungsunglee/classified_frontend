import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import Link from './Link'

const getAccountMenuList = () => {
  return [
    {
      url: '/account/manage-items',
      IconComponent: ListAltOutlinedIcon,
      label: '投稿の管理',
    },
    {
      url: '/account/bookmarks',
      IconComponent: FavoriteBorderIcon,
      label: 'ブックマーク',
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

const GlobalDrawer = ({ open, onClose, authUser, onLogout }) => {
  const accountMenuList = getAccountMenuList()

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '80%',
          maxWidth: '360px',
        },
      }}
    >
      <Box p={2}>
        <List>
          <ListItemButton
            component={Link}
            href={`/account/profile/${authUser && authUser.id}`}
            noLinkStyle
          >
            <ListItemIcon>
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
              primaryTypographyProps={{
                fontWeight: 700,
                noWrap: true,
              }}
              secondary='プロフィールを見る'
              secondaryTypographyProps={{
                noWrap: true,
              }}
            />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          {accountMenuList.map((menu, index) => (
            <ListItemButton
              key={index}
              component={Link}
              href={menu.url}
              noLinkStyle
            >
              <ListItemIcon>
                <menu.IconComponent color='action' />
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon>
              <ExitToAppIcon color='action' />
            </ListItemIcon>
            <ListItemText primary='ログアウト' />
          </ListItemButton>
        </List>

        <Button
          component={Link}
          href='/classifieds/select-category'
          noLinkStyle
          fullWidth
          size='large'
          variant='contained'
          sx={{
            mt: 2,
          }}
        >
          新規投稿
        </Button>
      </Box>
    </Drawer>
  )
}

export default GlobalDrawer
