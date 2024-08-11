import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'

import api from '@/lib/api'

import useAuthUser from '@/hooks/useAuthUser'

import Layout from '@/components/Layout'
import Loading from '@/components/Loading'

const ActivatePage = () => {
  const router = useRouter()

  const { mutateAuthUser } = useAuthUser()

  useEffect(() => {
    const uidToken = router.query.uidToken

    const activate = async (uid, token) => {
      try {
        await api.post('auth/user/activation/', { uid, token })
        mutateAuthUser(
          (prev) =>
            prev && prev.isAuthenticated
              ? { ...prev, email_confirmed: true }
              : prev,
          false
        )
        toast('メールアドレスの認証が完了しました')
        router.push('/')
      } catch (error) {
        toast('メールアドレスの認証に失敗しました')
        router.push('/')
      }
    }

    if (uidToken && uidToken.length === 2) {
      activate(uidToken[0], uidToken[1])
    }
  }, [router, mutateAuthUser])

  return (
    <>
      <NextSeo title='メールアドレスを認証' />
      <Layout>
        <Loading />
      </Layout>
    </>
  )
}

export default ActivatePage
