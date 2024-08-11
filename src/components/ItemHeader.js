import React from 'react'

import { useRouter } from 'next/router'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'

import { useHistory } from '@/contexts/HistoryContext'

import BookmarkButton from './BookmarkButton'
import ShareButton from './ShareButton'

const ItemHeader = ({ ShareButtonProps, BookmarkButtonProps }) => {
  const router = useRouter()
  const { history } = useHistory()

  const handleClickBack = () => {
    if (
      history.length > 0 &&
      history[0].split('?')[0] === '/classifieds/search'
    ) {
      router.back()
    } else {
      router.push('/classifieds/search')
    }
  }

  return (
    <AppBar color='inherit' position='static' elevation={1}>
      <Container>
        <Toolbar disableGutters>
          <IconButton
            onClick={handleClickBack}
            aria-label='戻る'
            sx={{ ml: -0.5 }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Stack direction='row' spacing={1} sx={{ ml: 'auto' }}>
            <ShareButton {...ShareButtonProps} />
            <BookmarkButton {...BookmarkButtonProps} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ItemHeader
