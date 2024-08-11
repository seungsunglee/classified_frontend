import React, { useEffect, useState, useRef } from 'react'

import { useRouter } from 'next/router'

import uniqBy from 'lodash.uniqby'
import { useForm } from 'react-hook-form'

import useSearchQuery from '@/hooks/useSearchQuery'

const useKeywordForm = ({ submitAction } = {}) => {
  const router = useRouter()
  const { searchQuery } = useSearchQuery()

  const ref = useRef(null)

  const [searchHistory, setSearchHistory] = useState([])

  const defaultValues = {
    keyword: router.query.keyword ? router.query.keyword : '',
  }

  const { control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues,
  })

  const onSubmit = handleSubmit((data) => {
    const { keyword } = data

    if (keyword && keyword.trim()) {
      let newSearchHistory = uniqBy([{ keyword }, ...searchHistory], 'keyword')
      if (newSearchHistory.length > 20) {
        newSearchHistory = newSearchHistory.slice(0, 20)
      }
      setSearchHistory(newSearchHistory)
      localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory))
    }

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

    ref.current.blur()

    if (submitAction) {
      submitAction()
    }
  })

  useEffect(() => {
    reset(defaultValues)
  }, [router])

  useEffect(() => {
    const localSearchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    if (localSearchHistory) {
      setSearchHistory(localSearchHistory)
    }
  }, [])

  return { control, onSubmit, watch, setValue, searchHistory, ref }
}

export default useKeywordForm
