import { useState } from 'react'

const useBackdrop = () => {
  const [open, setOpen] = useState(false)

  return { open, setOpen }
}

export default useBackdrop
