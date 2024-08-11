import { useCallback } from 'react'

import { toast } from 'react-toastify'
import useSWR from 'swr'

import api from '@/lib/api'

const useBookmarks = ({ authUser }) => {
  const { data: bookmarks, mutate: mutateBookmarks } = useSWR(
    authUser && authUser.isAuthenticated ? `auth/user/bookmarks/` : null,
    {
      revalidateIfStale: true,
    }
  )

  const handleBookmark = useCallback(
    async (id, active) => {
      if (!active) {
        try {
          const response = await api.post(`auth/user/bookmarks/${id}/bookmark/`)
          if (response.data.bookmarked) {
            mutateBookmarks((prev) => [...prev, id], false)
          }
        } catch (error) {
          toast('エラーが発生しました')
        }
      } else {
        try {
          const response = await api.post(
            `auth/user/bookmarks/${id}/unbookmark/`
          )
          if (response.data.unbookmarked) {
            mutateBookmarks((prev) => prev.filter((el) => el !== id), false)
          }
        } catch (error) {
          toast('エラーが発生しました')
        }
      }
    },
    [mutateBookmarks]
  )

  return { bookmarks, handleBookmark }
}

export default useBookmarks
