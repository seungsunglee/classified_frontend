import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import uniqBy from 'lodash.uniqby'
import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'
import { TransitionGroup } from 'react-transition-group'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'

import AccountLayout from '@/components/AccountLayout'
import Empty from '@/components/Empty'
import ItemHCard from '@/components/ItemHCard'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'

const limit = 30

const BookmarksPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })

  const [bookmarkedItems, setBookmarkedItems] = useState(null)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isReachingEnd, setIsReachingEnd] = useState(false)

  const handleBookmark = async (id) => {
    try {
      const response = await api.post(`auth/user/bookmarks/${id}/unbookmark/`)
      if (response.data.unbookmarked) {
        setBookmarkedItems((prev) => ({
          ...prev,
          count: prev.count - 1,
          results: prev.results.filter((el) => el.item.id !== id),
        }))
        setOffset((prev) => prev - 1)
      }
    } catch (error) {
      toast('エラーが発生しました')
    }
  }

  const fetchBookmarkedItems = async (offset) => {
    setLoading(true)
    try {
      const response = await api.get(
        `auth/user/bookmarks/items/?limit=${limit}&offset=${offset}`
      )
      setBookmarkedItems((prev) => {
        if (prev) {
          return {
            ...response.data,
            results: uniqBy(
              [...prev.results, ...response.data.results],
              'item.id'
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
  }

  useEffect(() => {
    if (authUser && authUser.isAuthenticated) {
      fetchBookmarkedItems(0)
    }
  }, [authUser])

  useEffect(() => {
    if (
      bookmarkedItems &&
      bookmarkedItems.results.length >= bookmarkedItems.count
    ) {
      setIsReachingEnd(true)
    }
  }, [bookmarkedItems])

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='ブックマーク' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='ブックマーク' noindex />
      <AccountLayout>
        <Box sx={{ mx: { xs: -2, sm: -3, lg: 0 } }}>
          {bookmarkedItems ? (
            <>
              {bookmarkedItems.count > 0 ? (
                <>
                  <TransitionGroup>
                    {bookmarkedItems.results.map((bookmark) => (
                      <Collapse key={bookmark.item.id} unmountOnExit>
                        <ItemHCard
                          item={bookmark.item}
                          InnerProps={{
                            component: Link,
                            href: `/classifieds/p/${bookmark.item.id}`,
                            noLinkStyle: true,
                          }}
                          BookmarkButtonProps={{
                            variant: 'delete',
                            onClick: () => handleBookmark(bookmark.item.id),
                          }}
                        />
                      </Collapse>
                    ))}
                  </TransitionGroup>

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
                        onClick={() => fetchBookmarkedItems(offset)}
                      >
                        もっと見る
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Empty
                  icon='bookmarks'
                  title='ブックマークした投稿はありません'
                />
              )}
            </>
          ) : (
            <>
              {Array.from(Array(30)).map((_, i) => (
                <ItemHCard key={i} loading />
              ))}
            </>
          )}
        </Box>
      </AccountLayout>
    </>
  )
}

export default BookmarksPage
