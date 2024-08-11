import React, { useState, useEffect } from 'react'

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
import useDeleteItemDialog from '@/hooks/useDeleteItemDialog'
import useUpdateItem from '@/hooks/useUpdateItem'

import AccountLayout from '@/components/AccountLayout'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import Empty from '@/components/Empty'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import ManageItemCard from '@/components/ManageItemCard'

const limit = 30

const ManageItemsPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })

  const [items, setItems] = useState(null)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isReachingEnd, setIsReachingEnd] = useState(false)

  const fetchItems = async (offset) => {
    setLoading(true)
    try {
      const response = await api.get(
        `auth/user/items/?limit=${limit}&offset=${offset}`
      )
      setItems((prev) => {
        if (prev) {
          return {
            ...response.data,
            results: uniqBy([...prev.results, ...response.data.results], 'id'),
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
      fetchItems(0)
    }
  }, [authUser])

  useEffect(() => {
    if (items && items.results.length >= items.count) {
      setIsReachingEnd(true)
    }
  }, [items])

  const { handleUpdateItem } = useUpdateItem({ setItems })

  const { open, handleClickOpen, handleClose, handleDeleteItem } =
    useDeleteItemDialog({ setItems, setOffset })

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='投稿の管理' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='投稿の管理' noindex />
      <AccountLayout>
        <Box sx={{ mx: { xs: -2, sm: -3, lg: 0 } }}>
          {items ? (
            <>
              {items.count > 0 ? (
                <>
                  <TransitionGroup>
                    {items.results.map((item, index) => (
                      <Collapse key={item.id} unmountOnExit>
                        <ManageItemCard
                          item={item}
                          onClickUpdateItem={() =>
                            handleUpdateItem(item.id, index)
                          }
                          onClickOpenDeleteItemDialog={() =>
                            handleClickOpen(item.id)
                          }
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
                        onClick={() => fetchItems(offset)}
                      >
                        もっと見る
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Empty
                  icon='manageItems'
                  title='まだ投稿がありません'
                  action={
                    <Button
                      component={Link}
                      href='/classifieds/select-category'
                      noLinkStyle
                      variant='contained'
                    >
                      新規投稿
                    </Button>
                  }
                />
              )}
            </>
          ) : (
            <>
              {Array.from(Array(30)).map((_, i) => (
                <ManageItemCard key={i} loading />
              ))}
            </>
          )}
        </Box>
      </AccountLayout>

      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        title='投稿の削除'
        content='投稿を削除すると元に戻すことは出来ません。削除しますか?'
        onClickDecideButton={handleDeleteItem}
        decideButtonText='削除'
      />
    </>
  )
}

export default ManageItemsPage
