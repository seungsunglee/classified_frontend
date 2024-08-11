import { useEffect } from 'react'

const Adsense = ({
  slot,
  style = { display: 'block' },
  format = 'auto',
  responsive = 'false',
  layoutKey = '',
}) => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <ins
      className='adsbygoogle'
      style={style}
      data-ad-client='ca-pub-1646223748314692'
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-ad-layout-key={layoutKey}
    ></ins>
  )
}

export default Adsense
