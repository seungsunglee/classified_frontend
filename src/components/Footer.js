import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Link from './Link'

const Footer = ({ mdDeep = false }) => (
  <Box component='footer' mt='auto'>
    <Box
      sx={{
        mt: 5,
        pt: 3,
        pb: mdDeep ? { xs: '90px', md: 3 } : 3,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            justifyContent: { md: 'space-between' },
          }}
        >
          <Typography component='div' variant='caption' mb={{ xs: 1, md: 0 }}>
            Copyright © Telopea All rights reserved.
          </Typography>
          <Stack direction='row' spacing={2}>
            <Link
              href='mailto:info@telopea.net'
              variant='caption'
              color='text.primary'
            >
              お問い合わせ
            </Link>
            <Link
              href='/help/article/1'
              variant='caption'
              color='text.primary'
              target='_blank'
            >
              利用規約
            </Link>
            <Link
              href='/help/article/2'
              variant='caption'
              color='text.primary'
              target='_blank'
            >
              プライバシーポリシー
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  </Box>
)

export default Footer
