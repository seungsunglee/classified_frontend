import { useEffect, useState, useCallback } from 'react'

import uniqBy from 'lodash.uniqby'
import useSWR from 'swr'

import api from '@/lib/api'

const useResponses = ({ authUser, selectedParticipantId }) => {
  const [responses, setResponses] = useState(null)
  const [page, setPage] = useState(1)

  const { data: participant, mutate: mutateParticipant } = useSWR(
    authUser && authUser.isAuthenticated && selectedParticipantId
      ? `direct/participants/${selectedParticipantId}/`
      : null,
    { revalidateIfStale: true }
  )

  const fetchResponses = useCallback(
    async (page) => {
      try {
        const response = await api.get(
          `direct/responses/?participant_id=${selectedParticipantId}&page=${page}`
        )

        setResponses((prev) => {
          if (prev) {
            return {
              ...response.data,
              results: uniqBy(
                [...prev.results, ...response.data.results],
                'id'
              ),
            }
          }
          return response.data
        })
      } catch (error) {}
    },
    [selectedParticipantId]
  )

  const addNewResponse = (newResponse) => {
    setResponses((prev) => ({
      ...prev,
      count: prev.count + 1,
      results: [newResponse, ...prev.results],
    }))
  }

  useEffect(() => {
    if (authUser && authUser.isAuthenticated && selectedParticipantId) {
      fetchResponses(page)
    }
  }, [authUser, selectedParticipantId, fetchResponses, page])

  return {
    participant,
    mutateParticipant,
    responses,
    addNewResponse,
    setPage,
  }
}

export default useResponses
