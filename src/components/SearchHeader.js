import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import SortForm from '@/components/SortForm'

const SearchHeader = ({
  title,
  categories,
  searchQuery,
  onClickOpenFilterDrawer,
}) => {
  let newQuery = {}
  if (searchQuery) {
    const { page, ...query } = searchQuery
    newQuery = { ...query }
  }
  const searchQueryCount = newQuery && Object.keys(newQuery).length
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { xs: 0, lg: 1.5 },
        pb: { xs: 1, lg: 1.5 },
      }}
    >
      <Box
        component='h1'
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          pr: 1,
          m: 0,
          typography: {
            xs: 'h6',
            lg: 'h5',
          },
        }}
      >
        <Box component='span' fontWeight={700}>
          {title}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <SortForm
          categories={categories}
          searchQuery={searchQuery}
          size='small'
        />
      </Box>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <IconButton onClick={onClickOpenFilterDrawer}>
          <Badge
            badgeContent={searchQueryCount}
            color='primary'
            sx={{
              '& .MuiBadge-badge': {
                transition: 'none',
              },
            }}
          >
            <TuneOutlinedIcon />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  )
}

export default SearchHeader
