import React from 'react'

import { Controller } from 'react-hook-form'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

const ItemAttributeFields = ({ attributes, control, errors, watch }) => {
  const noPriceValue = watch('attributes.no_price')
  return (
    <>
      {'rent' in attributes && (
        <Controller
          name='attributes.rent'
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              type='number'
              required
              label={attributes.rent.name}
              error={!!errors.attributes?.rent}
              helperText={errors.attributes?.rent.message}
              inputRef={ref}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />
      )}

      {'price' in attributes && (
        <Stack spacing={1}>
          <Controller
            name='attributes.price'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                type='number'
                label={attributes.price.name}
                disabled={noPriceValue}
                error={!!errors.attributes?.price}
                helperText={errors.attributes?.price.message}
                inputRef={ref}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />

          {'no_price' in attributes && (
            <div>
            <Controller
              name='attributes.no_price'
              control={control}
              render={({ field: { value, ...field } }) => {
                return (
                  <FormControlLabel
                    label={attributes.no_price.name}
                    control={<Checkbox checked={value} {...field} />}
                  />
                )
              }}
            />
            </div>
          )}
        </Stack>
      )}
    </>
  )
}

export default ItemAttributeFields
