import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'
import useBlocks from '@/hooks/useBlocks'
import useBookmarks from '@/hooks/useBookmarks'
import useDialog from '@/hooks/useDialog'

import Adsense from '@/components/Adsense'
import BookmarkButton from '@/components/BookmarkButton'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ItemAttributes from '@/components/ItemAttributes'
import ItemAuthor from '@/components/ItemAuthor'
import ItemDirectButton from '@/components/ItemDirectButton'
import ItemGallery from '@/components/ItemGallery'
import ItemHeader from '@/components/ItemHeader'
import ItemSection from '@/components/ItemSection'
import ItemVCard from '@/components/ItemVCard'
import LayoutContainer from '@/components/LayoutContainer'
import Link from '@/components/Link'
import ShareButton from '@/components/ShareButton'
import Spoiler from '@/components/Spoiler'

const ConfirmationDialog = dynamic(() =>
  import('@/components/ConfirmationDialog')
)
const ItemShareDialog = dynamic(() => import('@/components/ItemShareDialog'))
const ItemDirectDialog = dynamic(() => import('@/components/ItemDirectDialog'))

const useIsBlocked = ({ authUser, targetId }) => {
  const [isBlocked, setIsBlocked] = useState(false)
  useEffect(() => {
    const fetchIsBlocked = async () => {
      try {
        const response = await api.get(
          `auth/user/blocks/${targetId}/is-blocked/`
        )
        setIsBlocked(response.data.is_blocked)
      } catch (error) {}
    }

    if (authUser && authUser.isAuthenticated && authUser.id !== targetId) {
      fetchIsBlocked(targetId)
    }
  }, [authUser, targetId])

  return { isBlocked }
}

const ItemPage = ({ item }) => {
  const router = useRouter()
  const { authUser } = useAuthUser()
  const { bookmarks, handleBookmark } = useBookmarks({ authUser })
  const { blocks, handleBlock } = useBlocks({ authUser })
  const targetId = item.author.id
  const { isBlocked } = useIsBlocked({ authUser, targetId })
  const { data: existingParticipant, mutate: mutateExistingParticipant } =
    useSWR(
      authUser && authUser.isAuthenticated && authUser.id !== item.author.id
        ? `classifieds/items/${item.id}/get-existing-participant/`
        : null
    )
  const { data: relatedItems } = useSWR(
    item ? `classifieds/items/${item.id}/related/` : null
  )
  const {
    open: openShareDialog,
    handleClickOpen: handleClickOpenShareDialog,
    handleClose: handleCloseShareDialog,
  } = useDialog()
  const {
    open: openDirectDialog,
    handleClickOpen: handleClickOpenDirectDialog,
    handleClose: handleCloseDirectDialog,
  } = useDialog()
  const {
    open: openBlockDialog,
    handleClickOpen: handleClickOpenBlockDialog,
    handleClose: handleCloseBlockDialog,
  } = useDialog()

  const blocked = blocks && blocks.includes(item.author.id)

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <>
      <NextSeo
        title={item.title}
        description={
          item.description.length > 160
            ? item.description.replace(/\r?\n/g, '').substring(0, 160) + '...'
            : item.description.replace(/\r?\n/g, '')
        }
        canonical={
          process.env.NEXT_PUBLIC_BASE_URL + router.asPath.split('?')[0]
        }
        openGraph={{
          images: [
            {
              url:
                item.images.length > 0
                  ? item.images[0].file
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/og_image.jpg`,
            },
          ],
        }}
      />
      <LayoutContainer>
        {!mdUp ? (
          <ItemHeader
            ShareButtonProps={{
              onClick: handleClickOpenShareDialog,
            }}
            BookmarkButtonProps={{
              active: bookmarks && bookmarks.includes(item.id),
              onClick: () => {
                if (authUser && authUser.isAuthenticated) {
                  handleBookmark(item.id, bookmarks.includes(item.id))
                } else {
                  toast('ログインしてください')
                }
              },
            }}
          />
        ) : (
          <Header />
        )}

        <Container sx={{ mt: item.images.length > 0 ? { xs: 0, md: 3 } : 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {item.images.length > 0 && <ItemGallery item={item} />}
              <Box
                sx={{
                  position: 'relative',
                  pr: { xs: 0, md: '100px' },
                }}
              >
                <Typography component='h1' variant='h4' fontWeight={700}>
                  {item.title}
                </Typography>

                {mdUp && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                    <ShareButton
                      floating
                      onClick={handleClickOpenShareDialog}
                      sx={{ mr: 1.5 }}
                    />

                    <BookmarkButton
                      floating
                      active={bookmarks && bookmarks.includes(item.id)}
                      onClick={() => {
                        if (authUser && authUser.isAuthenticated) {
                          handleBookmark(item.id, bookmarks.includes(item.id))
                        } else {
                          toast('ログインしてください')
                        }
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Typography variant='body2' color='text.secondary' mt={1}>
                {`${item.location.name}, ${item.location.state_code}`}
              </Typography>
              {item.price && (
                <Typography variant='h4' fontWeight={700} mt={0.5}>
                  {item.price}
                </Typography>
              )}

              <ItemSection>
                <Spoiler content={item.description} minHeight={135} />
              </ItemSection>

              {item.attributes.length > 0 && (
                <ItemSection title='基本情報'>
                  <ItemAttributes item={item} />
                </ItemSection>
              )}

              {!mdUp && (
                <ItemSection title='投稿者'>
                  <ItemAuthor item={item} />
                </ItemSection>
              )}

              {relatedItems && relatedItems.length > 0 && (
                <ItemSection title='関連する投稿'>
                  <Grid container spacing={3}>
                    {relatedItems.map((item, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <ItemVCard
                          item={item}
                          InnerProps={{
                            component: Link,
                            href: `/classifieds/p/${item.id}`,
                            noLinkStyle: true,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </ItemSection>
              )}
            </Grid>
            <Grid item xs={12} md={4} display={{ xs: 'none', md: 'block' }}>
              <Box
                sx={{
                  position: 'sticky',
                  width: '100%',
                  top: 'calc(64px + 24px)',
                }}
              >
                <ItemAuthor item={item}>
                  <ItemDirectButton
                    authUser={authUser}
                    item={item}
                    blocked={blocked}
                    isBlocked={isBlocked}
                    existingParticipant={existingParticipant}
                    onClickOpenDirectDialog={handleClickOpenDirectDialog}
                    onClickOpenBlockDialog={handleClickOpenBlockDialog}
                  />
                </ItemAuthor>

                {mdUp && (
                  <Box
                    sx={{
                      mt: 4,
                      border:
                        process.env.NODE_ENV === 'development'
                          ? '1px solid #ccc'
                          : 'none',
                    }}
                  >
                    <Adsense
                      slot='4753405710'
                      format='rectangle'
                      responsive='true'
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Footer mdDeep />
      </LayoutContainer>

      <ItemShareDialog
        item={item}
        open={openShareDialog}
        onClose={handleCloseShareDialog}
      />

      <ItemDirectDialog
        item={item}
        open={openDirectDialog}
        onClose={handleCloseDirectDialog}
        existingParticipant={existingParticipant}
        mutateExistingParticipant={mutateExistingParticipant}
      />

      <ConfirmationDialog
        open={openBlockDialog}
        onClose={handleCloseBlockDialog}
        title='ブロックを解除'
        content='ブロックを解除すると相手はあなたにメッセージを送信できるようになります。ブロックが解除されたことは相手に通知されません。'
        onClickDecideButton={() => {
          handleBlock(item.author.id, blocked)
          handleCloseBlockDialog()
        }}
        decideButtonText='ブロックを解除'
      />

      {!mdUp && (
        <AppBar
          position='fixed'
          color='inherit'
          sx={{
            top: 'auto',
            bottom: 0,
            borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Toolbar sx={{ py: '12px' }}>
            <ItemDirectButton
              authUser={authUser}
              item={item}
              blocked={blocked}
              existingParticipant={existingParticipant}
              onClickOpenDirectDialog={handleClickOpenDirectDialog}
              onClickOpenBlockDialog={handleClickOpenBlockDialog}
            />
          </Toolbar>
        </AppBar>
      )}
    </>
  )
}

export async function getServerSideProps({ query, req, locale }) {
  let item = null

  try {
    const response = await api.get(`classifieds/items/${query.id}/`)
    item = response.data
  } catch (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      item,
    },
  }
}

export default ItemPage
