import React, { useEffect, useRef, useState } from 'react'

import { Controller } from 'react-hook-form'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import HistoryIcon from '@mui/icons-material/History'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import useAutocomplete from '@mui/material/useAutocomplete'
import useMediaQuery from '@mui/material/useMediaQuery'

import useKeywordForm from '@/hooks/useKeywordForm'

const Autocomplete = ({
  control,
  onSubmit,
  setValue,
  value,
  onClose,
  searchHistory,
  inputRef,
}) => {
  const [inputValue, setInputValue] = useState('')

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    freeSolo: true,
    disableClearable: true,
    value,
    onChange: (event, newValue) => {
      if (newValue) {
        setValue('keyword', newValue.keyword)
        onSubmit()
      } else {
        setValue('keyword', null)
      }
    },
    onInputChange: (event, newInputValue) => setInputValue(newInputValue),
    options: [],
    getOptionLabel: (option) =>
      typeof option === 'string' ? option : option.keyword,
  })

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '16px 16px 16px 8px',
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
            render={({ field }) => (
              <Box
                {...getRootProps()}
                sx={{
                  width: '100%',
                }}
              >
                <TextField
                  {...field}
                  autoFocus
                  size='small'
                  fullWidth
                  InputProps={{
                    type: 'search',
                  }}
                  inputProps={{
                    ...getInputProps(),
                    placeholder: '何をお探しですか？',
                  }}
                  inputRef={inputRef}
                />
              </Box>
            )}
          />
        </Box>
      </Box>
      <DialogContent
        dividers
        sx={{
          p: 0,
        }}
      >
        {groupedOptions.length > 0 ? (
          <List {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <ListItemButton {...getOptionProps({ option, index })}>
                <ListItemText primary={option.keyword} />
              </ListItemButton>
            ))}
          </List>
        ) : (
          <>
            {inputValue.length <= 0 ? (
              <List>
                {searchHistory.map((option, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      setValue('keyword', option.keyword)
                      onSubmit()
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: '40px',
                      }}
                    >
                      <HistoryIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary={option.keyword} />
                  </ListItemButton>
                ))}
              </List>
            ) : null}
          </>
        )}
      </DialogContent>
    </>
  )
}

const KeywordFormDialog = ({ open, onClose }) => {
  const { control, onSubmit, setValue, watch, searchHistory, ref } =
    useKeywordForm({ submitAction: onClose })

  const value = watch('keyword')

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  useEffect(() => {
    if (mdUp) {
      onClose()
    }
  }, [mdUp])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen
      transitionDuration={{ enter: 0, exit: 0 }}
    >
      <Autocomplete
        control={control}
        onSubmit={onSubmit}
        setValue={setValue}
        value={value}
        onClose={onClose}
        searchHistory={searchHistory}
        inputRef={ref}
      />
    </Dialog>
  )
}

export default KeywordFormDialog
