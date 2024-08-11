import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import IconButton from '@mui/material/IconButton'

import WhiteIconButton from './WhiteIconButton'

const ShareButton = ({ floating = false, ...props }) => {
  let Component = !floating ? IconButton : WhiteIconButton

  return (
    <Component {...props} aria-label='シェア'>
      <ShareOutlinedIcon fontSize={!floating ? 'medium' : 'small'} />
    </Component>
  )
}

export default ShareButton
