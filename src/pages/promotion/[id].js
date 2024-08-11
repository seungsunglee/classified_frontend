import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { loadStripe } from '@stripe/stripe-js'
import { NextSeo } from 'next-seo'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'

import Error from '@/components/Error'
import ItemHCard from '@/components/ItemHCard'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import ResponsiveContainer from '@/components/ResponsiveContainer'

const CheckoutPage = () => {
  const router = useRouter()
  const { id, option_id } = router.query
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })

  const [data, setData] = useState(null)
  const [statusCode, setStatusCode] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `promotion/items/${id}/?option_id=${option_id}`
        )
        setData(response.data)
      } catch (error) {
        if (error.response) {
          setStatusCode(error.response.status)
        } else {
          setStatusCode(500)
        }
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, option_id])

  const handleClick = async () => {
    const stripe = await loadStripe(data.stripe_public_key)

    const response = await api.post('promotion/create-checkout-session/', {
      item_id: data.item.id,
      option_ids: data.option_ids,
      total_price: data.total_price,
      cancel_url: router.asPath,
    })

    const session = await response.data

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
    }
  }

  useEffect(() => {
    if (data && data.options.length <= 0) {
      router.push('/account/manage-items')
    }
  }, [data, router])

  if (statusCode) {
    return (
      <Layout>
        <Error statusCode={statusCode} />
      </Layout>
    )
  }

  if (
    !authUser ||
    !authUser.isAuthenticated ||
    !data ||
    data.options.length <= 0
  ) {
    return (
      <>
        <NextSeo title='お支払い内容の確認' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='お支払い内容の確認' noindex />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '550px' }} sx={{ mt: 3 }}>
          <Typography component='h1' variant='h4' fontWeight={700} mb={3}>
            お支払い内容の確認
          </Typography>

          <Stack spacing={3}>
            <div>
              <Typography fontWeight={700}>プロモーション対象</Typography>
              <ItemHCard item={data.item} disableUnderline disablePadding />
            </div>

            <TableContainer>
              <Table size='small'>
                <TableHead
                  sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}
                >
                  <TableRow>
                    <TableCell>名称</TableCell>
                    <TableCell align='right'>期間</TableCell>
                    <TableCell align='right'>金額 (AUD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.options.map((option) => (
                    <TableRow key={option.id}>
                      <TableCell>{option.name}</TableCell>
                      <TableCell align='right'>{option.term}日間</TableCell>
                      <TableCell align='right'>${option.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>合計</TableCell>
                    <TableCell align='right'>${data.total_price}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant='caption' color='text.secondary'>
              当サイトの
              <Link href='/help/article/1' target='_blank'>
                利用規約
              </Link>
              、
              <Link href='/help/article/2' target='_blank'>
                プライバシーポリシー
              </Link>
              に同意した上で続行してください。
            </Typography>
            <Stack direction='row' spacing={2} justifyContent='flex-end'>
              <Button
                component={Link}
                href='/account/manage-items'
                noLinkStyle
                variant='outlined'
              >
                キャンセル
              </Button>
              <Button variant='contained' onClick={handleClick}>
                お支払い
              </Button>
            </Stack>
          </Stack>
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default CheckoutPage
