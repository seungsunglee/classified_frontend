import React, { useEffect, useState } from 'react'

import { Controller } from 'react-hook-form'

import HistoryIcon from '@mui/icons-material/History'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'

import useKeywordForm from '@/hooks/useKeywordForm'

const KeywordForm = () => {
  const { control, onSubmit, setValue, watch, searchHistory, ref } =
    useKeywordForm()

  const value = watch('keyword')

  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (inputValue.length > 0) {
      setOptions([])
    } else {
      setOptions(searchHistory)
    }
  }, [inputValue, searchHistory])

  return (
    <form onSubmit={onSubmit} noValidate>
      <Controller
        name='keyword'
        control={control}
        render={({ field }) => (
          <Autocomplete
            size='small'
            fullWidth
            freeSolo
            disableClearable
            value={value}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.keyword
            }
            options={options}
            onChange={(event, newValue) => {
              if (newValue) {
                setValue('keyword', newValue.keyword)
                onSubmit()
              } else {
                setValue('keyword', null)
              }
            }}
            onInputChange={(event, newInputValue) =>
              setInputValue(newInputValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                autoComplete='off'
                InputProps={{
                  ...params.InputProps,
                  placeholder: '何をお探しですか？',
                  startAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  type: 'search',
                }}
                inputRef={ref}
              />
            )}
            renderOption={(props, option) => (
              <ListItemButton
                {...props}
                sx={{
                  '& .MuiListItemText-root': {
                    m: 0,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '32px',
                  }}
                >
                  <HistoryIcon fontSize='small' color='action' />
                </ListItemIcon>
                <ListItemText primary={option.keyword} />
              </ListItemButton>
            )}
            sx={{
              '& .MuiAutocomplete-input': {
                pl: '12px !important',
              },
            }}
          />
        )}
      />
    </form>
  )
}

export default KeywordForm
