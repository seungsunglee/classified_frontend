import React from 'react'

import dynamic from 'next/dynamic'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

import useAuthUser from '@/hooks/useAuthUser'
import useDialog from '@/hooks/useDialog'
import useDrawer from '@/hooks/useDrawer'
import useMenu from '@/hooks/useMenu'

import { useDirect } from '@/contexts/DirectContext'

import KeywordForm from './KeywordForm'
import Link from './Link'

import TelopeaIcon from '@/icons/Telopea'

const GlobalDrawer = dynamic(() => import('./GlobalDrawer'))
const HeaderAccountMenu = dynamic(() => import('./HeaderAccountMenu'))
const KeywordFormDialog = dynamic(() => import('./KeywordFormDialog'))

const Header = () => {
  const { authUser, handleLogout } = useAuthUser()
  const { unconfirmedParticipants } = useDirect()
  const {
    open: openDrawer,
    handleClickOpen: handleClickOpenDrawer,
    handleClose: handleCloseDrawer,
  } = useDrawer()
  const {
    open: openAccountMenu,
    anchorEl: anchorElAccountMenu,
    handleClickOpen: handleClickOpenAccountMenu,
    handleClose: handleCloseAccountMenu,
  } = useMenu()
  const {
    open: openKeywordFormDialog,
    handleClickOpen: handleClickOpenKeywordFormDialog,
    handleClose: handleCloseKeywordFormDialog,
  } = useDialog()

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))
  return (
    <>
      <AppBar color='inherit' elevation={1} position='sticky'>
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Link href='/' aria-label='Telopea' sx={{ mr: 3 }}>
                <TelopeaIcon
                  sx={{
                    width: '90px',
                    height: '25.65px',
                    verticalAlign: 'middle',
                  }}
                />
              </Link>

              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block',
                  },
                  width: '100%',
                  mr: 2,
                }}
              >
                <KeywordForm />
              </Box>
            </Box>

            <Stack direction='row' spacing={0.5}>
              <IconButton
                onClick={handleClickOpenKeywordFormDialog}
                aria-label='検索'
                sx={{
                  display: { xs: 'inline-flex', md: 'none' },
                }}
              >
                <SearchIcon />
              </IconButton>

              <IconButton
                component={Link}
                href='/account/bookmarks'
                noLinkStyle
                aria-label='お気に入り'
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>

              <IconButton
                component={Link}
                href='/account/direct'
                noLinkStyle
                aria-label='メッセージ'
              >
                <Badge
                  badgeContent={
                    unconfirmedParticipants && unconfirmedParticipants.length
                  }
                  max={99}
                  color='primary'
                  sx={{
                    '& .MuiBadge-badge': {
                      transition: 'none',
                    },
                  }}
                >
                  <MailOutlineIcon />
                </Badge>
              </IconButton>

              {authUser && authUser.isAuthenticated ? (
                <>
                  <IconButton
                    onClick={handleClickOpenAccountMenu}
                    aria-label='アカウントメニュー'
                    sx={{
                      display: { xs: 'none', md: 'inline-flex' },
                    }}
                  >
                    <Avatar
                      src={
                        authUser.image && authUser.image.file
                          ? authUser.image.file
                          : null
                      }
                      alt='アカウントメニュー'
                      sx={{
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={handleClickOpenDrawer}
                    sx={{
                      display: { xs: 'inline-flex', md: 'none' },
                    }}
                  >
                    <Avatar
                      src={
                        authUser.image && authUser.image.file
                          ? authUser.image.file
                          : null
                      }
                      sx={{
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  component={Link}
                  href='/login'
                  noLinkStyle
                  aria-label='ログイン'
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
              )}
            </Stack>
            <Button
              variant='contained'
              component={Link}
              href='/classifieds/select-category'
              noLinkStyle
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                ml: 1.5,
              }}
            >
              新規投稿
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {!mdDown && (
        <HeaderAccountMenu
          open={openAccountMenu}
          anchorEl={anchorElAccountMenu}
          authUser={authUser}
          onClose={handleCloseAccountMenu}
          onLogout={handleLogout}
        />
      )}

      <GlobalDrawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        authUser={authUser}
        onLogout={handleLogout}
      />

      <KeywordFormDialog
        open={openKeywordFormDialog}
        onClose={handleCloseKeywordFormDialog}
      />
    </>
  )
}

export default Header
