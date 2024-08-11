import { NextSeo } from 'next-seo'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'

import useAuthUser from '@/hooks/useAuthUser'

import Layout from '@/components/Layout'
import Link from '@/components/Link'
import Loading from '@/components/Loading'
import ResponsiveContainer from '@/components/ResponsiveContainer'

import SuccessIcon from '@/icons/Success'

const CheckoutPage = () => {
  const { authUser } = useAuthUser({
    redirectTo: '/login',
  })

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='お支払いが完了しました' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='お支払いが完了しました' noindex />
      <Layout>
        <ResponsiveContainer maxWidth={{ md: '550px' }} sx={{ mt: 3 }}>
          <Box
            sx={{
              textAlign: 'center',
              pt: 10,
            }}
          >
            <SuccessIcon
              sx={{
                fontSize: '60px',
                color: green[600],
              }}
            />
            <Typography variant='h5' fontWeight={700} mt={2}>
              お支払いが完了しました
            </Typography>
            <Typography variant='body2' color='text.secondary' mt={2}>
              お支払い時にご入力いただいたメールアドレス宛てに領収書のリンクが送信されました。お支払いいただいた内訳は
              <Link href='/account/payment-history'>お支払い履歴</Link>
              からご覧になれます。
            </Typography>
            <Button
              component={Link}
              href='/account/manage-items'
              noLinkStyle
              variant='contained'
              sx={{
                mt: 3,
              }}
            >
              投稿の管理
            </Button>
          </Box>
        </ResponsiveContainer>
      </Layout>
    </>
  )
}

export default CheckoutPage
