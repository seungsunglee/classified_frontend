import SvgIcon from '@mui/material/SvgIcon'

export default function EmptySearch(props) {
  return (
    <SvgIcon {...props}>
      <g transform='scale(1.7143)'>
        <g
          transform='matrix(-1,0,0,1,14,0)'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='.58333'
        >
          <circle cx='9' cy='5' r='4.5' />
          <line x1='.5' x2='6.08' y1='13.5' y2='8.43' />
        </g>
      </g>
    </SvgIcon>
  )
}
