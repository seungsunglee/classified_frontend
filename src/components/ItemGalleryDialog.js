import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/mousewheel'

SwiperCore.use([Navigation, Pagination, Mousewheel])

const ItemGalleryDialog = ({ images, open, onClose, index }) => (
  <Dialog open={open} fullScreen>
    <Box width='100%' position='relative'>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
      >
        <CloseIcon />
      </IconButton>
      <Swiper
        navigation
        pagination={{
          type: 'fraction',
        }}
        initialSlide={index}
        mousewheel={{
          forceToAxis: true,
        }}
        threshold={30}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${image.file})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  maxHeight: '75vh',
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  </Dialog>
)

export default ItemGalleryDialog
