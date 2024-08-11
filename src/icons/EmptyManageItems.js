import SvgIcon from '@mui/material/SvgIcon'

export default function EmptyManageItems(props) {
  return (
    <SvgIcon {...props}>
      <g transform='scale(1.7143)'>
        <g
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='.58333'
        >
          <path d='m12.5 12.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h5l5 5z' />
          <polyline points='7.5 0.5 7.5 5.5 12.5 5.5' />
        </g>
      </g>
    </SvgIcon>
  )
}
