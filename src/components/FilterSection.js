import React, { useState } from 'react'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { styled } from '@mui/material/styles'

const CollapseButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  userSelect: 'none',
  cursor: 'pointer',
  paddingTop: 16,
  paddingBottom: 16,
  fontSize: '.9rem',
  fontWeight: 700,
})

const FilterSection = ({ label, children }) => {
  const [open, setOpen] = useState(true)

  const handleClickOpen = () => {
    setOpen(!open)
  }

  return (
    <Box borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
      <CollapseButton onClick={handleClickOpen}>
        {label}
        {open ? (
          <ExpandLessIcon color='action' />
        ) : (
          <ExpandMoreIcon color='action' />
        )}
      </CollapseButton>
      <Collapse in={open} timeout={0} unmountOnExit>
        <Box pb={2}>{children}</Box>
      </Collapse>
    </Box>
  )
}

export default FilterSection
