import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

const validQuery = [
  'category_id',
  'location_id',
  'keyword',
  'min_rent',
  'max_rent',
  'min_price',
  'max_price',
  'page',
  'sort',
]

const useSearchQuery = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(null)
  const [searchCanonicalQuery, setSearchCanonicalQuery] = useState(null)

  useEffect(() => {
    if (router.isReady) {
      let newQuery = {}
      let newCanonicalQuery = {}
      for (let k of Object.keys(router.query)) {
        if (validQuery.includes(k) && Boolean(router.query[k])) {
          newQuery[k] = router.query[k]
          if (k == 'category_id' || k == 'location_id' || k == 'keyword') {
            newCanonicalQuery[k] = router.query[k]
          }
        }
      }
      setSearchQuery(newQuery)

      if (Object.keys(newCanonicalQuery).length > 0) {
        setSearchCanonicalQuery(newCanonicalQuery)
      } else {
        setSearchCanonicalQuery(null)
      }
    }
  }, [router])

  return { searchQuery, searchCanonicalQuery }
}

export default useSearchQuery
