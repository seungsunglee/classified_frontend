import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import ResponsiveContainer from 'components/ResponsiveContainer'
import { NextSeo } from 'next-seo'

import Typography from '@mui/material/Typography'

import api from '@/lib/api'

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

  const [instance, setInstance] = useState(null)
  const [statusCode, setStatusCode] = useState(null)

  useEffect(() => {
    const fetchInstance = async () => {
      try {
        const response = await api.get(
          `classifieds/items/${router.query.id}/form-data/`
        )
        setInstance(response.data)
      } catch (error) {
        if (error.response) {
          setStatusCode(error.response.status)
        } else {
          setStatusCode(500)
        }
      }
    }

    if (router.query.id) {
      fetchInstance()
    }
  }, [router])

  if (statusCode) {
    return (
      <Layout>
        <Error statusCode={statusCode} />
      </Layout>
    )
  }

  if (!authUser || !authUser.isAuthenticated || !instance) {
    return (
      <>
        <NextSeo title='投稿の編集' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='投稿の編集' noindex />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '550px' }} sx={{ mt: 3 }}>
          <Typography component='h1' variant='h4' fontWeight={700} mb={3}>
            投稿の編集
          </Typography>
          <ItemForm instance={instance} />
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default NewPage
