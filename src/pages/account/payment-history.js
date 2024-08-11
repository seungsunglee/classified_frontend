import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import uniqBy from 'lodash.uniqby'
import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'

import AccountLayout from '@/components/AccountLayout'
import Empty from '@/components/Empty'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import PaymentHistoryAccordion from '@/components/PaymentHistoryAccordion'

const limit = 30

const PaymentHistoryPage = () => {
  const router = useRouter()
  const { authUser } = useAuthUser({
    redirectTo: `/login?next=${router.asPath}`,
  })

  const [paymentHistories, setPaymentHistories] = useState(null)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isReachingEnd, setIsReachingEnd] = useState(false)

  const fetchPaymentHistories = async (offset) => {
    setLoading(true)
    try {
      const response = await api.get(
        `auth/user/payment-history/?limit=${limit}&offset=${offset}`
      )
      setPaymentHistories((prev) => {
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
      fetchPaymentHistories(0)
    }
  }, [authUser])

  useEffect(() => {
    if (
      paymentHistories &&
      paymentHistories.results.length >= paymentHistories.count
    ) {
      setIsReachingEnd(true)
    }
  }, [paymentHistories])

  if (!authUser || !authUser.isAuthenticated) {
    return (
      <>
        <NextSeo title='お支払い履歴' noindex />
        <Layout>
          <Loading />
        </Layout>
      </>
    )
  }

  return (
    <>
      <NextSeo title='お支払い履歴' noindex />
      <AccountLayout>
        <Box mt={2}>
          {paymentHistories && (
            <>
              {paymentHistories.count > 0 ? (
                <>
                  <div>
                    {paymentHistories.results.map((paymentHistory) => (
                      <PaymentHistoryAccordion
                        key={paymentHistory.id}
                        paymentHistory={paymentHistory}
                      />
                    ))}
                  </div>

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
                        onClick={() => fetchPaymentHistories(offset)}
                      >
                        もっと見る
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Empty icon='paymentHistory' title='お支払い履歴はありません' />
              )}
            </>
          )}
        </Box>
      </AccountLayout>
    </>
  )
}

export default PaymentHistoryPage
