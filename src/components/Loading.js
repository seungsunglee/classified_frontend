import CircularProgress from '@mui/material/CircularProgress'

import CalcContainer from './CalcContainer'

const Loading = () => {
  return (
    <CalcContainer>
      <CircularProgress />
    </CalcContainer>
  )
}

export default Loading
