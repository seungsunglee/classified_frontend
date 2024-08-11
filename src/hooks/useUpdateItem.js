import arrayMove from 'array-move'
import { toast } from 'react-toastify'

import api from '@/lib/api'

const useUpdateItem = ({ setItems }) => {
  const handleUpdateItem = async (itemId, index) => {
    try {
      await api.post(`classifieds/items/${itemId}/renew/`)
      setItems((prev) => ({
        ...prev,
        results: arrayMove(prev.results, index, 0),
      }))
      toast('更新しました')
    } catch (error) {
      toast('エラーが発生しました')
    }
  }

  return { handleUpdateItem }
}

export default useUpdateItem
