import React, { useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

import { getFilterRangeInputSchema } from '@/lib/validations'

const isNumber = (val) => {
  var regexp = new RegExp(/^([1-9]\d*|0)(\.\d+)?$/)
  return regexp.test(val)
}

const StyledTextField = styled(TextField)({
  'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
    {
      WebkitAppearance: 'none',
      margin: 0,
    },
})

const FilterRangeInput = ({ attribute, searchQuery, size }) => {
  const router = useRouter()
  const schema = getFilterRangeInputSchema()

  const minName = `min_${attribute.slug}`
  const maxName = `max_${attribute.slug}`

  const defaultValues = useMemo(
    () => ({
      [minName]:
        router.query[minName] && isNumber(router.query[minName])
          ? router.query[minName]
          : '',
      [maxName]:
        router.query[maxName] && isNumber(router.query[maxName])
          ? router.query[maxName]
          : '',
    }),
    [router.query, minName, maxName]
  )

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const minValue = data[minName]
    const maxValue = data[maxName]

    let newQuery = {}
    const { page, ...query } = searchQuery

    if (
      typeof minValue !== 'undefined' &&
      minValue !== null &&
      minValue !== ''
    ) {
      query[minName] = minValue
      newQuery = query
    } else {
      delete query[minName]
      newQuery = query
    }
    if (
      typeof maxValue !== 'undefined' &&
      maxValue !== null &&
      maxValue !== ''
    ) {
      query[maxName] = maxValue
      newQuery = query
    } else {
      delete query[maxName]
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

  return (
    <form noValidate>
      <Stack direction='row' spacing={1}>
        <Controller
          name={minName}
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <StyledTextField
              type='number'
              size={size}
              fullWidth
              inputProps={{
                placeholder: '最小',
                min: 0,
              }}
              onWheel={(event) => event.target.blur()}
              onChange={(event) => {
                onChange(event)
                handleSubmit(onSubmit)()
              }}
              error={!!errors[minName]}
              {...field}
            />
          )}
        />
        <Controller
          name={maxName}
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <StyledTextField
              type='number'
              size={size}
              fullWidth
              inputProps={{
                placeholder: '最大',
                min: 0,
              }}
              onWheel={(event) => event.target.blur()}
              onChange={(event) => {
                onChange(event)
                handleSubmit(onSubmit)()
              }}
              error={!!errors[maxName]}
              {...field}
            />
          )}
        />
      </Stack>
    </form>
  )
}

export default FilterRangeInput
