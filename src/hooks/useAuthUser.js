import { useEffect } from 'react'

import Router from 'next/router'

import useSWR from 'swr'

import api from '@/lib/api'

export default function useAuthUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: authUser, mutate: mutateAuthUser } = useSWR(
    '/api/fetchAuthUser',
    {
      fetcher: (resource, init) =>
        fetch(resource, init).then((res) => res.json()),
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  )

  const handleLogout = async () => {
    try {
      await api.post('auth/logout/')
      window.location.href = '/'
    } catch (error) {}
  }

  useEffect(() => {
    if (!redirectTo || !authUser) return

    if (
      (redirectTo && !redirectIfFound && !authUser?.isAuthenticated) ||
      (redirectIfFound && authUser?.isAuthenticated)
    ) {
      Router.push(redirectTo)
    }
  }, [authUser, redirectIfFound, redirectTo])

  return { authUser, mutateAuthUser, handleLogout }
}
