import { useState, useRef, useEffect } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'

const Spoiler = ({ content, minHeight }) => {
  const ref = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [collapsedSize, setCollapsedSize] = useState(minHeight)
  const [showButton, setShowButton] = useState(false)

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (ref && ref.current) {
      if (ref.current.clientHeight <= minHeight) {
        setCollapsedSize(ref.current.clientHeight)
      } else {
        setCollapsedSize(minHeight)
        setShowButton(true)
      }
    }
  }, [ref, minHeight])

  return (
    <>
      <Collapse in={expanded} timeout={0} collapsedSize={collapsedSize}>
        <Typography fontSize='.925rem' whiteSpace='pre-wrap' ref={ref}>
          {content}
        </Typography>
      </Collapse>

      {!expanded && showButton && (
        <Box textAlign='center' my={2}>
          <Button endIcon={<KeyboardArrowDownIcon />} onClick={handleExpand}>
            もっと見る
          </Button>
        </Box>
      )}
    </>
  )
}

export default Spoiler
