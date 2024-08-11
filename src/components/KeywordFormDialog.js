import React, { useEffect, useState } from 'react'

import { Controller } from 'react-hook-form'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'

import api from '@/lib/api'

import useKeywordForm from '@/hooks/useKeywordForm'

const KeywordFormDialog = ({ open, onClose }) => {
  const { control, onSubmit, watch, ref } = useKeywordForm({
    callback: onClose,
  })

  const value = watch('keyword')

  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

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

  useEffect(() => {
    if (mdUp) {
      onClose()
    }
  }, [mdUp, onClose])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen
      transitionDuration={{ enter: 0, exit: 0 }}
      disableRestoreFocus
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '16px 16px 16px 8px',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            mr: 1,
          }}
        >
          <ArrowBackIosNewIcon fontSize='small' />
        </IconButton>

        <Box component='form' onSubmit={onSubmit} noValidate width='100%'>
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
                PopperComponent={(props) => (
                  <Popper
                    {...props}
                    popperOptions={{
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, 20],
                          },
                        },
                      ],
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: 'calc(100vh - 72px)',
                      overflow: 'auto',
                    }}
                  />
                )}
                PaperComponent={(props) => <Paper {...props} elevation={0} />}
                ListboxProps={{
                  sx: {
                    maxHeight: '100%',
                  },
                }}
                {...field}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    autoComplete='off'
                    InputProps={{
                      ...params.InputProps,
                      placeholder: '何をお探しですか？',
                    }}
                    inputRef={ref}
                  />
                )}
              />
            )}
          />
        </Box>
      </Box>
    </Dialog>
  )
}

export default KeywordFormDialog
