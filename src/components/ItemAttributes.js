import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const ItemAttributes = ({ item }) => (
  <Grid container spacing={0.5}>
    {item.attributes.map((attribute, index) => (
      <React.Fragment key={index}>
        <Grid item container spacing={2}>
          <Grid item xs={3} md={2}>
            <Typography color='text.secondary'>{attribute.name}</Typography>
          </Grid>
          <Grid item xs>
            <Typography>{attribute.value}</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    ))}
  </Grid>
)

export default ItemAttributes
