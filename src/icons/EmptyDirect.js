import SvgIcon from '@mui/material/SvgIcon'

export default function EmptyDirect(props) {
  return (
    <SvgIcon {...props}>
      <g transform='scale(1.7143)'>
        <path
          d='M0.500 1.750 L13.500 1.750 L13.500 12.250 L0.500 12.250 Z'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='.58333'
        ></path>
        <path
          d='M.5,3.015,6.355,7.956a1,1,0,0,0,1.29,0L13.5,3.015'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='.58333'
        ></path>
      </g>
    </SvgIcon>
  )
}
