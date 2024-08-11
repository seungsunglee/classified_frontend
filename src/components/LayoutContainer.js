import { useEffect, useRef, useState } from 'react'

import { styled } from '@mui/material/styles'

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

const LayoutContainer = ({ children }) => {
  const [adSenseInjectorObserver, setAdSenseInjectorObserver] = useState(null)
  const ref = useRef()

  useEffect(() => {
    if (!adSenseInjectorObserver && ref) {
      setAdSenseInjectorObserver(
        new MutationObserver((mutations, observer) => {
          ref.current.style.removeProperty('min-height')
          ref.current.style.removeProperty('height')
        })
      )
    } else {
      adSenseInjectorObserver.observe(ref.current, {
        attributes: true,
        attributeFilter: ['style'],
      })
    }

    return () => {
      if (adSenseInjectorObserver) {
        adSenseInjectorObserver.disconnect()
        setAdSenseInjectorObserver(null)
      }
    }
  }, [adSenseInjectorObserver, ref])

  return <Root ref={ref}>{children}</Root>
}

export default LayoutContainer
