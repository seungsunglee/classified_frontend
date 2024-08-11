import React, { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/router'

import { format } from 'date-fns'
import uniqBy from 'lodash.uniqby'
import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

import api from '@/lib/api'

import Empty from '@/components/Empty'
import Error from '@/components/Error'
import ItemVCard from '@/components/ItemVCard'
import Layout from '@/components/Layout'
import Link from '@/components/Link'

const GuestInfo = ({ guestUser, showMdDown = false }) => {
  return guestUser && (guestUser.introduction || guestUser.website) ? (
    <Box
      sx={{
        display: !showMdDown
          ? { xs: 'none', md: 'block' }
          : { xs: 'block', md: 'none' },
        mt: !showMdDown ? 1 : 3,
      }}
    >
      {guestUser.introduction && (
        <Typography variant='body2' whiteSpace='pre-wrap'>
          {guestUser.introduction}
        </Typography>
      )}

      {guestUser.website && (
        <Box mt={guestUser.introduction ? 1 : 0}>
          <MuiLink
            variant='body2'
            href={guestUser.website}
            target='_blank'
            rel='noopener'
          >
            {guestUser.website}
          </MuiLink>
        </Box>
      )}
    </Box>
  ) : null
}

const limit = 18

const ProfileIdPage = () => {
  const router = useRouter()
  const { data: guestUser, error } = useSWR(
    router.query.id ? `accounts/users/${router.query.id}/` : null,
    {
      revalidateIfStale: true,
    }
  )

  const [items, setItems] = useState(null)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isReachingEnd, setIsReachingEnd] = useState(false)

  const fetchItems = useCallback(
    async (offset) => {
      setLoading(true)
      try {
        const response = await api.get(
          `accounts/users/${guestUser.id}/items/?limit=${limit}&offset=${offset}`
        )
        setItems((prev) => {
          if (prev) {
            return {
              ...response.data,
              results: uniqBy(
                [...prev.results, ...response.data.results],
                'id'
              ),
            }
          }
          return response.data
        })
        setOffset(offset + limit)
      } catch (error) {
        toast('エラーが発生しました')
      }
      setLoading(false)
    },
    [guestUser]
  )

  useEffect(() => {
    if (guestUser) {
      fetchItems(0)
    }
  }, [guestUser, fetchItems])

  useEffect(() => {
    if (items && items.results.length >= items.count) {
      setIsReachingEnd(true)
    }
  }, [items])

  if (error) {
    return (
      <Layout>
        <Error statusCode={error.response.status} />
      </Layout>
    )
  }

  let title = ''
  let description =
    'オーストラリアの生活情報ウェブサイト - Telopea。求人情報、不動産、中古品売買などの募集広告を無料で掲載できます。オーストラリアのローカル情報が満載。'
  if (guestUser) {
    title = `${guestUser.username}さんのプロフィール`
    description = `${guestUser.username}さんの投稿一覧が掲載されています。${description}`
  }

  return (
    <>
      <NextSeo title={title} description={description} />
      <Layout>
        <Container sx={{ mt: 3 }}>
          <Grid container>
            <Grid item xs='auto'>
              <Box minWidth={{ xs: '100px', md: '200px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    m: { xs: 0, md: 'auto' },
                    width: { xs: '70px', md: '100px' },
                    height: { xs: '70px', md: '100px' },
                  }}
                >
                  {!guestUser ? (
                    <Skeleton variant='circular' width='100%' height='100%' />
                  ) : (
                    <Avatar
                      src={
                        guestUser.image && guestUser.image.file
                          ? guestUser.image.file
                          : null
                      }
                      alt={guestUser.username}
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs>
              <Box mt={{ md: 1 }}>
                <Box
                  sx={{
                    typography: {
                      xs: 'body1',
                      md: 'h6',
                    },
                  }}
                >
                  <Box component='span' fontWeight={700}>
                    {!guestUser ? <Skeleton width={100} /> : guestUser.username}
                  </Box>
                </Box>

                <Box
                  sx={{
                    typography: {
                      xs: 'caption',
                      md: 'body2',
                    },
                  }}
                  color='text.secondary'
                >
                  {!guestUser ? (
                    <Skeleton width={150} />
                  ) : (
                    `登録日: ${format(
                      new Date(guestUser.date_joined),
                      'yyyy年MM月dd日'
                    )}`
                  )}
                </Box>

                <Box
                  sx={{
                    typography: {
                      xs: 'body2',
                      md: 'body1',
                    },
                  }}
                  mt={0.5}
                >
                  {!guestUser ? (
                    <Skeleton width={80} />
                  ) : (
                    <>
                      投稿
                      <Box fontWeight={700} component='span'>
                        {guestUser.items}
                      </Box>
                      件
                    </>
                  )}
                </Box>
              </Box>
              <GuestInfo guestUser={guestUser} />
            </Grid>
          </Grid>

          <GuestInfo guestUser={guestUser} showMdDown />

          {items ? (
            <>
              {items.count > 0 ? (
                <Box pt={6}>
                  <Grid container spacing={3} columns={12}>
                    {items.results.map((item) => (
                      <Grid item xs={6} sm={3} md={2} key={item.id}>
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

                  {loading && (
                    <Box textAlign='center' my={3}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!loading && !isReachingEnd && (
                    <Box textAlign='center' my={3}>
                      <Button
                        variant='outlined'
                        size='large'
                        onClick={() => fetchItems(offset)}
                      >
                        もっと見る
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <Empty icon='manageItems' title='まだ投稿がありません' />
              )}
            </>
          ) : (
            <Box pt={4}>
              <Grid container spacing={3}>
                {Array.from(Array(18)).map((_, i) => (
                  <Grid item xs={6} sm={3} md={2} key={i}>
                    <ItemVCard loading />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Layout>
    </>
  )
}

export default ProfileIdPage
