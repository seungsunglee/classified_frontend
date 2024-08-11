import { memo } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'

import WhiteIconButton from './WhiteIconButton'

const BookmarkButton = memo(
  ({ floating = false, active = false, variant = 'toggle', ...props }) => {
    let Component = !floating ? IconButton : WhiteIconButton

    return (
      <Component {...props} aria-label='ブックマーク'>
        {variant === 'toggle' && (
          <>
            {active ? (
              <FavoriteIcon
                fontSize={!floating ? 'medium' : 'small'}
                sx={{ color: red[400] }}
              />
            ) : (
              <FavoriteBorderIcon fontSize={!floating ? 'medium' : 'small'} />
            )}
          </>
        )}
        {variant === 'delete' && <CloseIcon />}
      </Component>
    )
  }
)

BookmarkButton.displayName = 'BookmarkButton'

export default BookmarkButton
