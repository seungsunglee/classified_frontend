import { useEffect, useRef, useMemo } from 'react'

import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'

import useSearchQuery from '@/hooks/useSearchQuery'

const useKeywordForm = ({ callback } = {}) => {
  const router = useRouter()
  const { searchQuery } = useSearchQuery()
  const ref = useRef(null)

  const defaultValues = useMemo(
    () => ({
      keyword: router.query.keyword ? router.query.keyword : '',
    }),
    [router.query.keyword]
  )

  const { control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues,
  })

  const onSubmit = handleSubmit((data) => {
    const { keyword } = data

    let newQuery = {}
    const { page, ...query } = searchQuery

    let modifiedQuery = query
    if (router.pathname !== '/classifieds/search') {
      modifiedQuery = {}
    }

    if (keyword && keyword.trim()) {
      modifiedQuery.keyword = keyword.trim()
      newQuery = modifiedQuery
    } else {
      delete modifiedQuery.keyword
      newQuery = modifiedQuery
    }

    const newParams =
      Object.keys(newQuery).length > 0
        ? '?' + new URLSearchParams(newQuery).toString()
        : ''
    router.push(`/classifieds/search${newParams}`)

    ref.current?.blur()

    if (callback) {
      callback()
    }
  })

  useEffect(() => {
    reset(defaultValues)
  }, [router, reset, defaultValues])

  return { control, onSubmit, watch, setValue, ref }
}

export default useKeywordForm
