import { memo } from 'react'

import { toast } from 'react-toastify'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Dialog from '@mui/material/Dialog'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import CloseableDialogTitle from './CloseableDialogTitle'

import FacebookIcon from '@/icons/Facebook'
import MessengerIcon from '@/icons/Messenger'
import TwitterIcon from '@/icons/Twitter'

const getOptions = (item, url) => {
  return [
    {
      name: 'Facebook',
      icon: <FacebookIcon sx={{ color: '#1877F2' }} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon sx={{ color: '#1DA1F2' }} />,
      href: `https://twitter.com/intent/tweet?url=${url}&text=${item.title}`,
    },
    {
      name: 'メッセンジャー',
      icon: <MessengerIcon />,
      href: `http://www.facebook.com/dialog/send?app_id=515967435655579&link=${url}&redirect_uri=${url}`,
    },
    {
      name: 'メールアドレス',
      icon: <EmailOutlinedIcon color='action' />,
      href: `mailto:?subject=${item.title}&body=${url}`,
    },
  ]
}

const ItemShareDialog = memo(({ item, open, onClose }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/classifieds/p/${item.id}`

  const options = getOptions(item, url)

  const handleClickCopy = () => {
    if (window.clipboardData) {
      window.clipboardData.setData('Text', url)
      toast('リンクをコピーしました')
      return true
    } else if (navigator.clipboard) {
      toast('リンクをコピーしました')
      return navigator.clipboard.writeText(url)
    } else {
      return false
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '300px',
          width: '100%',
        },
      }}
    >
      <CloseableDialogTitle onClose={onClose}>シェア</CloseableDialogTitle>
      <div>
        <List>
          <ListItemButton
            onClick={() => handleClickCopy()}
            sx={{
              p: '8px 24px',
            }}
          >
            <ListItemIcon sx={{ minWidth: 48 }}>
              <ContentCopyIcon />
            </ListItemIcon>
            <ListItemText primary='リンクをコピー' />
          </ListItemButton>
          {options.map((option, index) => (
            <ListItemButton
              key={index}
              component='a'
              href={option.href}
              target='_blank'
              rel='noopener'
              sx={{
                p: '8px 24px',
              }}
            >
              <ListItemIcon sx={{ minWidth: 48 }}>{option.icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Dialog>
  )
})

ItemShareDialog.displayName = 'ItemShareDialog'

export default ItemShareDialog
