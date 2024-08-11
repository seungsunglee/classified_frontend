import TextField from '@mui/material/TextField'

const FilterSelectField = ({
  value,
  onChange,
  parentValue = '',
  options,
  optionName = 'name',
  size,
}) => {
  return (
    <TextField
      value={value}
      fullWidth
      select
      SelectProps={{
        native: true,
      }}
      size={size}
      onChange={onChange}
    >
      <option value={parentValue}>すべて</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option[optionName]}
        </option>
      ))}
    </TextField>
  )
}

export default FilterSelectField
