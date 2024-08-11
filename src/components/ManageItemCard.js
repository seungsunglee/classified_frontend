import React from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import useMenu from '@/hooks/useMenu'

import Link from './Link'

const PromotionLabel = styled('div')(({ theme }) => ({
  fontSize: '.75rem',
  color: '#4caf50',
  border: '1px solid #4caf50',
  borderRadius: 6,
  padding: '2px 4px',
}))

const ManageItemCard = ({
  item,
  loading = false,
  onClickUpdateItem,
  onClickOpenDeleteItemDialog,
}) => {
  const { open, anchorEl, handleClickOpen, handleClose } = useMenu()
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          userSelect: 'none',
          py: 2,
          px: { xs: 2, sm: 3, lg: 2 },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <Skeleton
            variant='rectangular'
            sx={{
              width: '95px',
              minWidth: '95px',
              height: '95px',
              borderRadius: (theme) => theme.shape.borderRadius,
            }}
          />
        ) : (
          <CardMedia
            component={Link}
            href={`/classifieds/p/${item.id}`}
            noLinkStyle
            image={
              item.image
                ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${item.image}`
                : '/empty.png'
            }
            sx={{
              width: '95px',
              minWidth: '95px',
              height: '95px',
              borderRadius: (theme) => theme.shape.borderRadius,
            }}
          />
        )}
        <Box
          sx={{
            width: '100%',
            minWidth: 0,
            ml: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              pr: 7,
              mb: 0.5,
            }}
          >
            {loading ? (
              <Skeleton width='100%' />
            ) : (
              <Link
                variant='body2'
                color='text.primary'
                href={`/classifieds/p/${item.id}`}
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  overflow: 'hidden',
                }}
              >
                {item.title}
              </Link>
            )}
          </Box>

          {loading ? (
            <Skeleton width='30%' />
          ) : (
            <Stack direction='row' spacing={1.5}>
              <Stack direction='row' spacing={0.5} alignItems='center'>
                <FavoriteBorderOutlinedIcon fontSize='small' color='action' />
                <Typography variant='body2'>{item.bookmarks}</Typography>
              </Stack>
              <Stack direction='row' spacing={0.5} alignItems='center'>
                <VisibilityOutlinedIcon fontSize='small' color='action' />
                <Typography variant='body2'>{item.views}</Typography>
              </Stack>
            </Stack>
          )}

          <Box display='flex' mt='auto'>
            {!loading && item.promotions.length > 0 && (
              <PromotionLabel>プロモーション適用中</PromotionLabel>
            )}
          </Box>
        </Box>
        {!loading && (
          <IconButton
            onClick={handleClickOpen}
            sx={{ position: 'absolute', top: 10, right: 8 }}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>

      {!loading && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClick={handleClose}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={onClickUpdateItem}>
            <ListItemIcon>
              <AutorenewIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary='更新する'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
          <MenuItem
            component={Link}
            href={`/classifieds/edit/${item.id}`}
            noLinkStyle
          >
            <ListItemIcon>
              <EditOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary='編集する'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
          <MenuItem onClick={onClickOpenDeleteItemDialog}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary='削除する'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        </Menu>
      )}
    </>
  )
}

export default ManageItemCard
