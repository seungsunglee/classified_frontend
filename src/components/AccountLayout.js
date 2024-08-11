import React from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import AccountMenu from './AccountMenu'
import Layout from './Layout'

const AccountLayout = ({ children }) => (
  <Layout>
    <Container sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <AccountMenu />
        </Grid>
        <Grid item xs={12} lg={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </Layout>
)

export default AccountLayout
