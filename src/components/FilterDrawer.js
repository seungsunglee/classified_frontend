import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'

import FilterFields from './FilterFields'

const FilterDrawer = ({
  open,
  onClose,
  categories,
  locations,
  searchQuery,
}) => {
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '80%',
          maxWidth: '360px',
        },
      }}
    >
      <Box p={2}>
        <FilterFields
          categories={categories}
          locations={locations}
          searchQuery={searchQuery}
          size='medium'
        />
      </Box>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          width: '100%',
          backgroundColor: '#fff',
          position: 'sticky',
          bottom: 0,
          left: 'auto',
          right: 0,
          borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Button variant='contained' size='large' fullWidth onClick={onClose}>
          検索
        </Button>
      </Box>
    </Drawer>
  )
}

export default FilterDrawer
