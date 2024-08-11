import React from 'react'

import SortableList, { SortableItem } from 'react-easy-sort'

import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

import WhiteIconButton from './WhiteIconButton'

const UploadButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '100%',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  '&.Mui-disabled': {
    borderColor: theme.palette.action.disabled,
    '& .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  },
}))

const ItemImageField = ({
  images,
  disabled,
  getRootProps,
  getInputProps,
  onSortEnd,
  onDelete,
  isUploading,
}) => (
  <Box
    display='grid'
    gridTemplateColumns='repeat(12, 1fr)'
    gap={1}
    component={SortableList}
    onSortEnd={onSortEnd}
    allowDrag={!isUploading}
  >
    <Box gridColumn={{ xs: 'span 4', sm: 'span 3' }}>
      <UploadButton {...getRootProps()} disabled={disabled || isUploading}>
        <AddAPhotoOutlinedIcon
          color='primary'
          sx={{
            fontSize: '3rem',
            pointerEvents: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
          }}
        />
        <input {...getInputProps()} />
      </UploadButton>
    </Box>
    {images.map((image) => (
      <SortableItem key={image.temp_id}>
        <Box gridColumn={{ xs: 'span 4', sm: 'span 3' }}>
          <Card sx={{ position: 'relative' }}>
            <CardMedia
              image={image.file}
              sx={{
                width: '100%',
                paddingTop: '100%',
                opacity: image.loading && 0.5,
              }}
            />
            {image.loading ? (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translateY(-50%) translateX(-50%)',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <WhiteIconButton
                size='small'
                onClick={() => onDelete(image.id)}
                sx={{
                  position: 'absolute',
                  top: 3,
                  right: 3,
                }}
              >
                <ClearIcon color='action' />
              </WhiteIconButton>
            )}
          </Card>
        </Box>
      </SortableItem>
    ))}
  </Box>
)

export default ItemImageField
