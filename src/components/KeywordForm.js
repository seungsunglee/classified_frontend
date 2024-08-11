import { useState, useEffect } from 'react'

import { Controller } from 'react-hook-form'

import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import api from '@/lib/api'

import useKeywordForm from '@/hooks/useKeywordForm'

const KeywordForm = () => {
  const { control, setValue, onSubmit, watch, ref } = useKeywordForm()

  const value = watch('keyword')

  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    const fetchKeywords = async () => {
      if (active) {
        try {
          const response = await api.get(
            `keywords/autocomplete/?term=${inputValue}`
          )

          let newOptions = []

          if (response.data) {
            newOptions = [...newOptions, ...response.data]
          }

          setOptions(newOptions)
        } catch (error) {}
      }
    }

    if (inputValue.length > 0) {
      fetchKeywords()
    }

    return () => {
      active = false
    }
  }, [inputValue, value])

  return (
    <form onSubmit={onSubmit} noValidate>
      <Controller
        name='keyword'
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <Autocomplete
            size='small'
            fullWidth
            freeSolo
            selectOnFocus
            disableClearable
            includeInputInList
            filterSelectedOptions
            filterOptions={(x) => x}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.title
            }
            options={options}
            onChange={(event, newValue) => {
              setOptions(newValue ? [newValue.title, ...options] : options)
              onChange(
                newValue
                  ? typeof newValue === 'string'
                    ? newValue
                    : newValue.title
                  : null
              )
              if (newValue) {
                onSubmit()
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
              if (newInputValue.length <= 0) {
                setValue('keyword', '')
              }
            }}
            {...field}
            renderInput={(params) => (
              <TextField
                {...params}
                autoComplete='off'
                InputProps={{
                  ...params.InputProps,
                  placeholder: '何をお探しですか？',
                  startAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                inputRef={ref}
              />
            )}
          />
        )}
      />
    </form>
  )
}

export default KeywordForm
