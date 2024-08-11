import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

const useSearchPagination = ({ searchQuery }) => {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const handleChange = (event, value) => {
    searchQuery.page = value
    router.push(
      `${router.pathname}?${new URLSearchParams(searchQuery).toString()}`
    )
  }

  useEffect(() => {
    if (router.query.page) {
      setPage(Number(router.query.page))
    } else {
      setPage(1)
    }
  }, [router.query])

  return { page, handleChange }
}

export default useSearchPagination
