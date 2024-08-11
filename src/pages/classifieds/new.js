import { useRouter } from 'next/router'

import ResponsiveContainer from 'components/ResponsiveContainer'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'

import Typography from '@mui/material/Typography'

import useAuthUser from '@/hooks/useAuthUser'

import Error from '@/components/Error'
import ItemForm from '@/components/ItemForm'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'

const NewPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })

  const { data: instance, error } = useSWR(
    router.query.category_id
      ? `classifieds/items/empty-form-data/?category_id=${router.query.category_id}`
      : null
  )

  if (error) {
    return (
      <Layout>
        <Error statusCode={error.response.status} />
      </Layout>
    )
  }

  if (!authUser || !authUser.isAuthenticated || !instance) {
    return (
      <>
        <NextSeo title='新規投稿' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='新規投稿' noindex />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '550px' }} sx={{ mt: 3 }}>
          <Typography component='h1' variant='h4' fontWeight={700} mb={3}>
            新規投稿
          </Typography>
          <ItemForm instance={instance} />
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default NewPage
