import { useRouter } from 'next/router'

const useFilterSelectField = ({ searchQuery }) => {
  const router = useRouter()

  const getSpecifiedQuery = (query) => {
    const { category_id, location_id, keyword } = query

    let newQuery = {}

    if (category_id) {
      newQuery['category_id'] = category_id
    }
    if (location_id) {
      newQuery['location_id'] = location_id
    }
    if (keyword) {
      newQuery['keyword'] = keyword
    }

    return newQuery
  }

  const handleChange = (event, idSlug, rootChanged) => {
    const value = event.target.value

    let newQuery = {}
    const { page, ...query } = searchQuery

    if (value) {
      query[idSlug] = value
      newQuery = Boolean(rootChanged) ? getSpecifiedQuery(query) : query
    } else {
      delete query[idSlug]
      newQuery = Boolean(rootChanged) ? getSpecifiedQuery(query) : query
    }

    const newParams =
      Object.keys(newQuery).length > 0
        ? '?' + new URLSearchParams(newQuery).toString()
        : ''
    router.push(`${router.pathname}${newParams}`)
  }

  return { handleChange }
}

export default useFilterSelectField
