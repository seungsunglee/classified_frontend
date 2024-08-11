import { useState } from 'react'

import { toast } from 'react-toastify'

import api from '@/lib/api'

const useDeleteItemDialog = ({ setItems, setOffset }) => {
  const [itemId, setItemId] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClickOpen = (value) => {
    setItemId(value)
    setOpen(true)
  }

  const handleClose = () => {
    setItemId(null)
    setOpen(false)
  }

  const handleDeleteItem = async () => {
    try {
      await api.delete(`auth/user/items/${itemId}/`)
      setItems((prev) => ({
        ...prev,
        count: prev.count - 1,
        results: prev.results.filter((el) => el.id !== itemId),
      }))
      setOffset((prev) => prev - 1)
    } catch (error) {
      toast('エラーが発生しました')
    }
    handleClose()
  }

  return { open, handleClickOpen, handleClose, handleDeleteItem }
}

export default useDeleteItemDialog
