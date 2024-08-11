import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import EmptyBookmarksIcon from '@/icons/EmptyBookmarks'
import EmptyDirectIcon from '@/icons/EmptyDirect'
import EmptyManageItemsIcon from '@/icons/EmptyManageItems'
import EmptySearchIcon from '@/icons/EmptySearch'

const Root = styled('div')({
  marginTop: 120,
  marginBottom: 120,
  textAlign: 'center',
})

const iconMapping = {
  manageItems: EmptyManageItemsIcon,
  bookmarks: EmptyBookmarksIcon,
  search: EmptySearchIcon,
  direct: EmptyDirectIcon,
  paymentHistory: EmptyManageItemsIcon,
}

const Empty = ({ icon, title, action }) => {
  const IconComponent = iconMapping[icon]
  return (
    <Root>
      <IconComponent
        sx={{
          fontSize: '80px',
          color: (theme) => theme.palette.grey[400],
        }}
      />
      <Typography
        fontWeight={700}
        sx={{
          mt: 2,
        }}
      >
        {title}
      </Typography>
      {action && <Box mt={3}>{action}</Box>}
    </Root>
  )
}

export default Empty
