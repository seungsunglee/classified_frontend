import { useState, useRef, useEffect, useCallback } from 'react'

import uniqBy from 'lodash.uniqby'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import api from '@/lib/api'

const limit = 30

const useParticipants = ({ authUser }) => {
  const ref = useRef(null)
  const [scroll, setScroll] = useState(0)
  const [participants, setParticipants] = useState(null)
  const [offset, setOffset] = useState(0)

  const {
    data: unconfirmedParticipants,
    mutate: mutateUnconfirmedParticipants,
  } = useSWR(
    authUser && authUser.isAuthenticated
      ? 'direct/participants/unconfirmed/'
      : null
  )

  const fetchParticipants = async (offset) => {
    try {
      const response = await api.get(
        `direct/participants/?limit=${limit}&offset=${offset}`
      )

      setParticipants((prev) => {
        if (prev) {
          return {
            ...response.data,
            results: uniqBy([...prev.results, ...response.data.results], 'id'),
          }
        }
        return response.data
      })
      setOffset(offset + limit)
    } catch (error) {
      toast('エラーが発生しました')
    }
  }

  const addNewParticipant = (newParticipant) => {
    setParticipants((prev) => ({
      ...prev,
      count: prev.count + 1,
      results: uniqBy([newParticipant, ...prev.results], 'id'),
    }))
  }

  const reloadParticipants = () => {
    setOffset(0)
    setParticipants(null)
    fetchParticipants(0)
  }

  const readParticipant = useCallback(
    (selectedParticipantId) => {
      mutateUnconfirmedParticipants(
        (prev) =>
          prev.filter((el) => Number(el) !== Number(selectedParticipantId)),
        false
      )
      setParticipants((prev) => {
        if (prev) {
          return {
            ...prev,
            results: prev.results.map((el) =>
              Number(el.id) === Number(selectedParticipantId)
                ? { ...el, is_read: true }
                : el
            ),
          }
        }
      })
    },
    [mutateUnconfirmedParticipants]
  )

  const deleteParticipant = (participantId) => {
    setParticipants((prev) => ({
      ...prev,
      count: prev.count - 1,
      results: prev.results.filter((el) => el.id !== participantId),
    }))
    setOffset((prev) => prev - 1)
  }

  const confirmParticipants = useCallback(async () => {
    try {
      await api.post('auth/user/confirm-direct/')
      mutateUnconfirmedParticipants([], false)
    } catch (error) {}
  }, [mutateUnconfirmedParticipants])

  useEffect(() => {
    if (authUser && authUser.isAuthenticated) {
      fetchParticipants(0)
    }
  }, [authUser])

  return {
    ref,
    scroll,
    setScroll,
    participants,
    fetchParticipants,
    reloadParticipants,
    addNewParticipant,
    readParticipant,
    deleteParticipant,
    offset,
    unconfirmedParticipants,
    confirmParticipants,
  }
}

export default useParticipants
