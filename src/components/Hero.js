import React from 'react'

import Image from 'next/image'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Link from './Link'
import WhiteButton from './WhiteButton'

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f6fbff',
        pt: { xs: 0, lg: '50px' },
        pb: '50px',
        mb: 5,
      }}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} lg={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                textAlign: { xs: 'center', lg: 'left' },
                mb: { xs: '100px', lg: 0 },
              }}
            >
              <Box
                component='h1'
                mb={0.5}
                sx={{
                  typography: {
                    xs: 'h4',
                    md: 'h3',
                  },
                }}
              >
                <Box component='span' fontWeight={700}>
                  <div>オーストラリア生活に役立つ</div>
                  <div>ローカル情報が満載</div>
                </Box>
              </Box>
              <Box
                component='h2'
                mb={4}
                sx={{
                  typography: {
                    xs: 'body2',
                    md: 'body1',
                  },
                }}
              >
                <Box component='span' fontWeight={700}>
                  オーストラリアの生活情報ウェブサイト
                </Box>
              </Box>
              <div>
                <Button
                  component={Link}
                  href='/classifieds/search'
                  noLinkStyle
                  variant='contained'
                  size='large'
                  sx={{
                    mr: 1,
                  }}
                >
                  検索する
                </Button>
                <WhiteButton
                  component={Link}
                  href='/classifieds/select-category'
                  noLinkStyle
                  variant='contained'
                  size='large'
                >
                  新規投稿
                </WhiteButton>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} lg={7}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '350px', sm: '450px' },
              }}
            >
              <Image
                src='/hero.png'
                alt='オーストラリアの生活情報ウェブサイト'
                layout='fill'
                priority={true}
                objectFit='contain'
                objectPosition='center center'
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Hero
