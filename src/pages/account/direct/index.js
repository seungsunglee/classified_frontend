import React, { useEffect, useState, useCallback } from 'react'

import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import { TransitionGroup } from 'react-transition-group'
import useSWR from 'swr'

import CachedIcon from '@mui/icons-material/Cached'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'

import { useDirect } from '@/contexts/DirectContext'

import AccountLayout from '@/components/AccountLayout'
import Empty from '@/components/Empty'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import ParticipantItem from '@/components/ParticipantItem'

const DirectPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })
  const { mutateUnconfirmedParticipants } = useDirect()
  const [page, setPage] = useState(1)

  const { data: participants, mutate } = useSWR(
    authUser && authUser.isAuthenticated
      ? `direct/participants/?page=${page}`
      : null,
    {
      revalidateIfStale: true,
    }
  )

  const handleChangePage = (event, value) => {
    router.push(`${router.pathname}?page=${value}`)
  }

  const confirmParticipants = useCallback(async () => {
    try {
      await api.post('auth/user/confirm-direct/')
      mutateUnconfirmedParticipants([], false)
    } catch (error) {}
  }, [mutateUnconfirmedParticipants])

  const reloadParticipants = () => {
    mutate()
    confirmParticipants()
  }

  useEffect(() => {
    if (authUser && authUser.isAuthenticated) {
      confirmParticipants()
    }
  }, [authUser, confirmParticipants])

  useEffect(() => {
    if (router.query.page) {
      setPage(Number(router.query.page))
    } else {
      setPage(1)
    }
  }, [router.query])

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='メッセージ' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='メッセージ' noindex />
      <AccountLayout>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography component='h1' variant='h5' fontWeight={700}>
              メッセージ
            </Typography>
            <Button
              variant='outlined'
              size='small'
              startIcon={<CachedIcon />}
              onClick={() => reloadParticipants()}
            >
              更新
            </Button>
          </Box>
          <Box sx={{ mx: { xs: -2, sm: -3, lg: 0 } }}>
            {participants ? (
              <>
                {participants.count > 0 ? (
                  <>
                    <Divider />
                    <TransitionGroup>
                      {participants.results.map((participant) => (
                        <Collapse key={participant.id} unmountOnExit>
                          <ParticipantItem
                            participant={participant}
                            InnerProps={{
                              component: Link,
                              href: `/account/direct/${participant.id}`,
                              noLinkStyle: true,
                            }}
                          />
                        </Collapse>
                      ))}
                    </TransitionGroup>
                    {participants.total_pages > 1 && (
                      <Pagination
                        color='primary'
                        count={participants.total_pages}
                        page={page}
                        siblingCount={0}
                        onChange={handleChangePage}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 3,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Empty icon='direct' title='メッセージはありません' />
                )}
              </>
            ) : (
              <>
                {Array.from(Array(30)).map((_, i) => (
                  <ParticipantItem key={i} loading />
                ))}
              </>
            )}
          </Box>
        </Box>
      </AccountLayout>
    </>
  )
}

export default DirectPage
