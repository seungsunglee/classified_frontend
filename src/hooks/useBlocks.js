import { toast } from 'react-toastify'
import useSWR from 'swr'

import api from '@/lib/api'

const useBlocks = ({ authUser }) => {
  const { data: blocks, mutate: mutateBlocks } = useSWR(
    authUser && authUser.isAuthenticated ? `auth/user/blocks/` : null
  )

  const handleBlock = async (id, active) => {
    if (!active) {
      try {
        const response = await api.post(`auth/user/blocks/${id}/block/`)
        if (response.data.blocked) {
          mutateBlocks((prev) => [...prev, id], false)
        }
      } catch (error) {
        toast('エラーが発生しました')
      }
    } else {
      try {
        const response = await api.post(`auth/user/blocks/${id}/unblock/`)
        if (response.data.unblocked) {
          mutateBlocks((prev) => prev.filter((el) => el !== id), false)
        }
      } catch (error) {
        toast('エラーが発生しました')
      }
    }
  }

  return { blocks, handleBlock }
}

export default useBlocks
