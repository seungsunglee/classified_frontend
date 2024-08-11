import { useEffect } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import useMediaQuery from '@mui/material/useMediaQuery'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'
import useBookmarks from '@/hooks/useBookmarks'
import useDrawer from '@/hooks/useDrawer'
import useSearchMeta from '@/hooks/useSearchMeta'
import useSearchPagination from '@/hooks/useSearchPagination'
import useSearchQuery from '@/hooks/useSearchQuery'

import Adsense from '@/components/Adsense'
import Empty from '@/components/Empty'
import FilterFields from '@/components/FilterFields'
import ItemHCard from '@/components/ItemHCard'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import SearchHeader from '@/components/SearchHeader'

const FilterDrawer = dynamic(() => import('@/components/FilterDrawer'))

const SearchPage = ({ categories, locations, keyword }) => {
  const router = useRouter()
  const { authUser } = useAuthUser()
  const { bookmarks, handleBookmark } = useBookmarks({ authUser })

  const { searchQuery, searchCanonicalQuery } = useSearchQuery()
  const { page, handleChange: handleChangePage } = useSearchPagination({
    searchQuery,
  })

  const searchQueryParams =
    searchQuery && Object.keys(searchQuery).length
      ? `?${new URLSearchParams(searchQuery).toString()}`
      : ''

  const { data: fixed_items } = useSWR(
    searchQuery ? `classifieds/items/fixed/${searchQueryParams}` : null,
    { revalidateIfStale: true }
  )
  const { data: unfixed_items } = useSWR(
    searchQuery ? `classifieds/items/${searchQueryParams}` : null,
    {
      revalidateIfStale: true,
    }
  )

  const { open, handleClickOpen, handleClose } = useDrawer()

  const { title, resultTitle, description } = useSearchMeta({
    categories,
    locations,
    keyword,
  })

  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))

  useEffect(() => {
    const registerKeyword = async () => {
      try {
        await api.post('keywords/register/', { keyword })
      } catch (error) {}
    }
    if (keyword) {
      registerKeyword()
    }
  }, [keyword])

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={
          searchCanonicalQuery
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${
                router.asPath.split('?')[0]
              }?${new URLSearchParams(searchCanonicalQuery).toString()}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}${
                router.asPath.split('?')[0]
              }`
        }
        openGraph={{}}
      />
      <Layout>
        <Container sx={{ mt: 1 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={3} display={{ xs: 'none', lg: 'block' }}>
              <Box>
                <FilterFields
                  categories={categories}
                  locations={locations}
                  searchQuery={searchQuery}
                  size='small'
                />
              </Box>
              {lgUp && (
                <Box
                  sx={{
                    mt: 4,
                    position: 'sticky',
                    width: '100%',
                    top: 'calc(64px + 32px)',
                    border:
                      process.env.NODE_ENV === 'development'
                        ? '1px solid #ccc'
                        : 'none',
                  }}
                >
                  <Adsense slot='4864467802' responsive='true' />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} lg={9}>
              <SearchHeader
                title={resultTitle}
                categories={categories}
                searchQuery={searchQuery}
                onClickOpenFilterDrawer={handleClickOpen}
              />
              <Box sx={{ mx: { xs: -2, sm: -3, lg: 0 } }}>
                {fixed_items && unfixed_items ? (
                  <>
                    {fixed_items.length > 0 || unfixed_items.count > 0 ? (
                      <>
                        <Divider />
                        {fixed_items.map((item) => (
                          <ItemHCard
                            key={item.id}
                            item={item}
                            isFixed
                            isHighlight={item.promotions.includes('highlight')}
                            InnerProps={{
                              component: Link,
                              href: `/classifieds/p/${item.id}`,
                              noLinkStyle: true,
                            }}
                            BookmarkButtonProps={{
                              active: bookmarks && bookmarks.includes(item.id),
                              onClick: () => {
                                if (authUser && authUser.isAuthenticated) {
                                  handleBookmark(
                                    item.id,
                                    bookmarks.includes(item.id)
                                  )
                                } else {
                                  toast('ログインしてください')
                                }
                              },
                            }}
                          />
                        ))}
                        {unfixed_items.results.map((item) => (
                          <ItemHCard
                            key={item.id}
                            item={item}
                            isHighlight={item.promotions.includes('highlight')}
                            InnerProps={{
                              component: Link,
                              href: `/classifieds/p/${item.id}`,
                              noLinkStyle: true,
                            }}
                            BookmarkButtonProps={{
                              active: bookmarks && bookmarks.includes(item.id),
                              onClick: () => {
                                if (authUser && authUser.isAuthenticated) {
                                  handleBookmark(
                                    item.id,
                                    bookmarks.includes(item.id)
                                  )
                                } else {
                                  toast('ログインしてください')
                                }
                              },
                            }}
                          />
                        ))}
                        {unfixed_items.total_pages > 1 && (
                          <Pagination
                            color='primary'
                            count={unfixed_items.total_pages}
                            page={page}
                            siblingCount={smUp ? 2 : 0}
                            onChange={handleChangePage}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              mt: 3,
                              '& .MuiPagination-ul': {
                                flexWrap: 'nowrap',
                              },
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <Empty icon='search' title='該当する投稿がありません' />
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
            </Grid>
          </Grid>
        </Container>
      </Layout>

      <FilterDrawer
        open={open}
        onClose={handleClose}
        categories={categories}
        locations={locations}
        searchQuery={searchQuery}
      />
    </>
  )
}

export async function getServerSideProps({ req, query, locale }) {
  const { category_id = '', location_id = '', keyword = '' } = query

  const categoriesResponse = await api.get(
    `classifieds/categories/set/?selected_id=${category_id}`
  )
  const categories = { ...categoriesResponse.data }

  const locationsResponse = await api.get(
    `locations/set/?selected_id=${location_id}`
  )
  const locations = { ...locationsResponse.data }

  return {
    props: {
      categories,
      locations,
      keyword,
    },
  }
}

export default SearchPage
