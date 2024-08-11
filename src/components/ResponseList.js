import React from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { styled } from '@mui/material/styles'

import ResponseForm from '@/components/ResponseForm'
import ResponseListItem from '@/components/ResponseListItem'

const Root = styled('div')({
  overflowY: 'auto',
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingBottom: '32px',
  display: 'flex',
  flexDirection: 'column-reverse',
})

const ResponseList = ({
  responses,
  addNewResponse,
  setPage,
  participant,
  blocked,
  onClickOpenDeleteParticipantDialog,
}) => {
  return (
    <Root id='scrollableResponses'>
      <InfiniteScroll
        dataLength={responses && responses.results.length}
        inverse={true}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflow: 'unset',
        }}
        next={() => setPage((prev) => prev + 1)}
        hasMore={responses && !!responses.next}
        loader={<></>}
        scrollableTarget='scrollableResponses'
      >
        <ResponseForm
          participant={participant}
          addNewResponse={addNewResponse}
          blocked={blocked}
          onClickOpenDeleteParticipantDialog={
            onClickOpenDeleteParticipantDialog
          }
          sx={{
            pt: responses.results.length > 0 ? 0 : 4,
          }}
        />

        {responses.results.length > 0 && (
          <>
            {responses.results.map((response, index) => (
              <ResponseListItem key={index} response={response} />
            ))}
          </>
        )}
      </InfiniteScroll>
    </Root>
  )
}

export default ResponseList
