import { useRouter } from 'next/router'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const FilterLocationField = ({
  parentValue,
  value,
  options,
  searchQuery,
  size,
}) => {
  const router = useRouter()

  const handleChange = (newValue) => {
    let newQuery = {}
    const { page, ...query } = searchQuery

    if (newValue) {
      query.location_id = newValue.id
      newQuery = query
    } else {
      query.location_id = parentValue
      newQuery = query
    }

    const newParams =
      Object.keys(newQuery).length > 0
        ? '?' + new URLSearchParams(newQuery).toString()
        : ''

    router.push(`${router.pathname}${newParams}`)
  }

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name_with_postcode
      }
      options={options}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, newValue) => handleChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size}
          fullWidth
          required
          InputProps={{
            placeholder: 'サバーブを選択',
            ...params.InputProps,
          }}
        />
      )}
    />
  )
}

export default FilterLocationField
