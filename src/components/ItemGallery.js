import { useEffect, useState, memo } from 'react'

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Skeleton from '@mui/material/Skeleton'
import useMediaQuery from '@mui/material/useMediaQuery'

import ItemGalleryDialog from '@/components/ItemGalleryDialog'

import WhiteButton from './WhiteButton'

const GalleryImage = ({ src, alt, rounded = false, onClick }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)

    return () => {
      if (!img) {
        return
      }

      img.onload = () => {}
      img = null
      setLoaded(false)
    }
  }, [src])

  return (
    <>
      {!loaded && (
        <Skeleton
          variant='rectangular'
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: (theme) =>
              rounded ? theme.shape.borderRadius : 'none',
          }}
        />
      )}
      <Fade in={!!loaded}>
        <Box
          component='img'
          src={src}
          alt={alt}
          onClick={onClick}
          sx={{
            borderRadius: (theme) =>
              rounded ? theme.shape.borderRadius : 'none',
            cursor: 'pointer',
            objectFit: 'cover',
            objectPosition: 'center center',
            width: '100%',
            height: '100%',
            visibility: !loaded ? 'hidden' : 'visible',
          }}
        />
      </Fade>
    </>
  )
}

const useItemGalleryDialog = () => {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const handleClickOpen = (index) => {
    setIndex(index)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return { open, index, handleClickOpen, handleClose }
}

const ItemGallery = memo(({ item }) => {
  const { open, index, handleClickOpen, handleClose } = useItemGalleryDialog()

  const imageCount = item.images.length

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <>
      <Box mb={2}>
        {!mdUp ? (
          <Box display={{ xs: 'block', md: 'none' }}>
            <Box height={370} mx={{ xs: -2, sm: -3, position: 'relative' }}>
              <GalleryImage
                src={item.images[0].file}
                alt={item.title}
                onClick={() => handleClickOpen(0)}
              />
            </Box>
          </Box>
        ) : (
          <Box display={{ xs: 'none', md: 'block' }}>
            <ImageList
              variant='quilted'
              cols={imageCount >= 2 ? 2 : 1}
              gap={10}
              rowHeight={imageCount > 2 ? 150 : 310}
              sx={{ my: 0, overflowY: 'hidden' }}
            >
              {item.images.slice(0, 3).map((image, index) => (
                <ImageListItem
                  key={index}
                  rows={index === 0 && imageCount > 2 ? 2 : 1}
                  sx={{ position: 'relative' }}
                >
                  <GalleryImage
                    src={image.file}
                    alt={item.title}
                    rounded
                    onClick={() => handleClickOpen(index)}
                  />
                  {index === 2 && imageCount > 3 && (
                    <WhiteButton
                      size='small'
                      variant='contained'
                      startIcon={<ImageOutlinedIcon />}
                      onClick={() => handleClickOpen(3)}
                      sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    >
                      もっと見る
                    </WhiteButton>
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </Box>

      <ItemGalleryDialog
        images={item.images}
        open={open}
        onClose={handleClose}
        index={index}
      />
    </>
  )
})

ItemGallery.displayName = 'ItemGallery'

export default ItemGallery
