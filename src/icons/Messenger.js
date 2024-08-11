import SvgIcon from '@mui/material/SvgIcon'

export default function Messenger(props) {
  return (
    <SvgIcon {...props}>
      <defs>
        <radialGradient cx="19.2474387%" cy="99.4651948%" fx="19.2474387%" fy="99.4651948%" r="108.959588%" id="radialGradient-1">
          <stop stopColor="#0099FF" offset="0%"></stop>
          <stop stopColor="#A033FF" offset="60.9753877%"></stop>
          <stop stopColor="#FF5280" offset="93.482299%"></stop>
          <stop stopColor="#FF7061" offset="100%"></stop>
        </radialGradient>
      </defs>
      <g id="logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect id="bounding-box" fillOpacity="0" fill="#FFFFFF" x="0" y="0" width="1em" height="1em"></rect>
        <g id="logo">
          <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" fill="url(#radialGradient-1)" />
        </g>
      </g>
    </SvgIcon>
  )
}