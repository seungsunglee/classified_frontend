import React from 'react'

import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'
import useBlocks from '@/hooks/useBlocks'
import useDialog from '@/hooks/useDialog'
import useMenu from '@/hooks/useMenu'
import useResponses from '@/hooks/useResponses'

import { useDirect } from '@/contexts/DirectContext'

import AccountMenu from '@/components/AccountMenu'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import Header from '@/components/Header'
import LayoutContainer from '@/components/LayoutContainer'
import Loading from '@/components/Loading'
import ResponseList from '@/components/ResponseList'
import ResponseListHeader from '@/components/ResponseListHeader'
import ResponseListHeaderMenu from '@/components/ResponseListHeaderMenu'

const BlockedMessageContainer = styled('div')(({ theme }) => ({
  marginTop: 'auto',
  padding: '24px',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
}))

const DirectIdPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })
  const { mutateUnconfirmedParticipants } = useDirect()
  const { blocks, handleBlock } = useBlocks({ authUser })

  const selectedParticipantId = router.query.id

  const { participant, responses, addNewResponse, setPage } = useResponses({
    authUser,
    selectedParticipantId,
  })

  const blocked =
    blocks && participant ? blocks.includes(participant.opponent.id) : undefined

  const { open, anchorEl, handleClickOpen, handleClose } = useMenu()
  const {
    open: openDeleteParticipantDialog,
    handleClickOpen: handleClickOpenDeleteParticipantDialog,
    handleClose: handleCloseDeleteParticipantDialog,
  } = useDialog()
  const {
    open: openBlockDialog,
    handleClickOpen: handleClickOpenBlockDialog,
    handleClose: handleCloseBlockDialog,
  } = useDialog()

  const handleDeleteParticipant = async () => {
    try {
      await api.post(`direct/participants/${participant.id}/mark-delete/`)
      router.replace('/account/direct')
    } catch (error) {
      toast('エラーが発生しました')
    }
    handleCloseDeleteParticipantDialog()
  }

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  mutateUnconfirmedParticipants((prev) => {
    if (prev) {
      if (authUser && authUser.isAuthenticated) {
        return prev.filter((el) => Number(el) !== Number(selectedParticipantId))
      }
    }
    return prev
  }, false)

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='メッセージ' noindex />
        {mdUp && <Header />}
        <Loading />
      </>
    )
  }

  return (
    <>
      <NextSeo title='メッセージ' noindex />
      <LayoutContainer>
        {mdUp && <Header />}
        <Container sx={{ mt: { xs: 0, lg: 1 } }}>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <AccountMenu />
            </Grid>
            <Grid item xs={12} lg={9} sx={{ mt: { xs: 0, lg: 2 } }}>
              {participant && responses ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: {
                      xs: '100vh',
                      md: 'calc(100vh - 65px)',
                      lg: 'calc(100vh - 115px)',
                    },
                    mx: { xs: -2, sm: -3, lg: 0 },
                    border: (theme) => ({
                      xs: 0,
                      lg: `1px solid ${theme.palette.divider}`,
                    }),
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }}
                >
                  <ResponseListHeader
                    participant={participant}
                    onClickOpenMenu={handleClickOpen}
                  />
                  <ResponseList
                    responses={responses}
                    addNewResponse={addNewResponse}
                    setPage={setPage}
                    participant={participant}
                    blocked={blocked}
                  />
                  {blocked && (
                    <BlockedMessageContainer>
                      <Typography variant='body2'>
                        ブロックしました。
                        <Box
                          component='span'
                          onClick={handleClickOpenDeleteParticipantDialog}
                          sx={{
                            color: 'primary.main',
                            cursor: 'pointer',
                          }}
                        >
                          スレッドを削除
                        </Box>
                      </Typography>
                    </BlockedMessageContainer>
                  )}
                </Box>
              ) : (
                <Loading />
              )}
            </Grid>
          </Grid>
        </Container>
      </LayoutContainer>

      <ResponseListHeaderMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClickOpenDeleteParticipantDialog={
          handleClickOpenDeleteParticipantDialog
        }
        onClickOpenBlockDialog={handleClickOpenBlockDialog}
        blocked={blocked}
      />

      <ConfirmationDialog
        open={openDeleteParticipantDialog}
        onClose={handleCloseDeleteParticipantDialog}
        title='スレッドを削除'
        content='削除すると元に戻すことは出来ません。削除しますか?'
        onClickDecideButton={handleDeleteParticipant}
        decideButtonText='削除'
      />

      <ConfirmationDialog
        open={openBlockDialog}
        onClose={handleCloseBlockDialog}
        title={!blocked ? 'ブロック' : 'ブロックを解除'}
        content={
          !blocked
            ? 'ブロックした相手からのメッセージが届かなくなります。ブロックしたことは相手に通知されません。'
            : 'ブロックを解除すると相手はあなたにメッセージを送信できるようになります。ブロックが解除されたことは相手に通知されません。'
        }
        onClickDecideButton={() => {
          handleBlock(participant.opponent.id, blocked)
          handleCloseBlockDialog()
        }}
        decideButtonText={!blocked ? 'ブロック' : 'ブロックを解除'}
      />
    </>
  )
}

export default DirectIdPage
