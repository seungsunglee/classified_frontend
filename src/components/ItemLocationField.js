import { useState, useEffect } from 'react'

import { Controller } from 'react-hook-form'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import api from '@/lib/api'

const ItemLocationField = ({ watch, control, errors }) => {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])

  const value = watch('location')

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    const fetchLocations = async () => {
      if (active) {
        try {
          const response = await api.get(
            `locations/autocomplete/?term=${inputValue}`
          )

          let newOptions = []

          if (value) {
            newOptions = [value]
          }

          if (response.data) {
            newOptions = [...newOptions, ...response.data]
          }

          setOptions(newOptions)
        } catch (error) {}
      }
    }

    if (inputValue.length > 1) {
      fetchLocations()
    }

    return () => {
      active = false
    }
  }, [inputValue, value])

  return (
    <Controller
      name='location'
      control={control}
      render={({ field: { onChange, ref, ...field } }) => (
        <Autocomplete
          getOptionLabel={(option) =>
            typeof option === 'string'
              ? option
              : option.name_with_postcode_and_state
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options)
            onChange(newValue)
          }}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          {...field}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              required
              InputProps={{
                placeholder: 'Sydney 2000, NSW',
                ...params.InputProps,
              }}
              error={!!errors.location}
              helperText={errors.location && errors.location.message}
              inputRef={ref}
            />
          )}
        />
      )}
    />
  )
}

export default ItemLocationField
