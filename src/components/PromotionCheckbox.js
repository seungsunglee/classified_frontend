import React, { useState } from 'react'

import { format } from 'date-fns'
import { Controller } from 'react-hook-form'

import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import PromotionFixedIcon from '@/icons/PromotionFixed'
import PromotionHighlightIcon from '@/icons/PromotionHighlight'

const iconMapping = {
  fixed: PromotionFixedIcon,
  highlight: PromotionHighlightIcon,
}

const PromotionCheckbox = ({
  promotion,
  control,
  active_promotions,
  ...props
}) => {
  const IconComponent = iconMapping[promotion.slug]

  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const active = promotion.slug in active_promotions

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      {...props}
    >
      <Grid item xs={!active ? 12 : 8} sm={8}>
        <Controller
          name={`promotions.types[${promotion.slug}]`}
          control={control}
          render={({ field: { value, ...field } }) => (
            <FormControlLabel
              disabled={active}
              control={<Checkbox checked={value} {...field} />}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IconComponent
                    sx={{
                      width: 30,
                      minWidth: 30,
                      height: 30,
                      mr: 2,
                      ml: 0.5,
                    }}
                  />
                  <Typography>{promotion.name}</Typography>
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={promotion.description}
                        arrow
                      >
                        <IconButton onClick={handleTooltipOpen} size='small'>
                          <HelpOutlineIcon fontSize='small' color='primary' />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </ClickAwayListener>
                </Box>
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={!active ? 12 : 4} sm>
        {!active ? (
          <Controller
            name={`promotions.options[${promotion.slug}]`}
            control={control}
            render={({ field }) => (
              <TextField
                variant='standard'
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                {...field}
                sx={{
                  mt: { xs: 2, sm: 0 },
                }}
              >
                {promotion.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {`$${option.price} / ${option.term}日間`}
                  </option>
                ))}
              </TextField>
            )}
          />
        ) : (
          <Typography
            variant='body2'
            textAlign='right'
            fontWeight={700}
            color='green'
          >
            {format(
              new Date(active_promotions[promotion.slug]),
              'MM/dd HH:mmまで有効'
            )}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default PromotionCheckbox
