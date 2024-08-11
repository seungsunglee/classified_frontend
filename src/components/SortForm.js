import { useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@mui/material/TextField'

const SortForm = ({ categories, searchQuery, size }) => {
  const router = useRouter()

  const defaultValues = useMemo(
    () => ({
      sort: router.query['sort'] ? router.query['sort'] : '',
    }),
    [router.query]
  )
  const { control, handleSubmit, reset } = useForm({ defaultValues })

  const onSubmit = (data) => {
    let newQuery = {}
    const { page, ...query } = searchQuery
    if (data['sort']) {
      query['sort'] = data['sort']
      newQuery = query
    } else {
      delete query['sort']
      newQuery = query
    }
    const newParams =
      Object.keys(newQuery).length > 0
        ? '?' + new URLSearchParams(newQuery).toString()
        : ''
    router.push(`/classifieds/search${newParams}`)
  }

  useEffect(() => {
    reset(defaultValues)
  }, [router, reset, defaultValues])

  let sx = {}
  if (size === 'small') {
    sx = {
      '& .MuiNativeSelect-select': {
        fontSize: '.875rem',
        p: '6px 12px',
      },
    }
  }

  return (
    <Controller
      name='sort'
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <TextField
          size={size}
          fullWidth={size === 'medium'}
          select
          SelectProps={{
            native: true,
            sx,
          }}
          onChange={(event) => {
            onChange(event)
            handleSubmit(onSubmit)()
          }}
          {...field}
        >
          {categories.sorts.map((sort, index) => (
            <option key={index} value={sort.value}>
              {sort.name}
            </option>
          ))}
        </TextField>
      )}
    />
  )
}

export default SortForm
