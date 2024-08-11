import React, { createContext, useContext } from 'react'

import useSWR from 'swr'

import useAuthUser from '@/hooks/useAuthUser'

const DirectContext = createContext()

export const DirectProvider = ({ children }) => {
  const { authUser } = useAuthUser()

  const {
    data: unconfirmedParticipants,
    mutate: mutateUnconfirmedParticipants,
  } = useSWR(
    authUser && authUser.isAuthenticated
      ? 'direct/participants/unconfirmed/'
      : null
  )

  return (
    <DirectContext.Provider
      value={{
        unconfirmedParticipants,
        mutateUnconfirmedParticipants,
      }}
    >
      {children}
    </DirectContext.Provider>
  )
}

export const useDirect = () => useContext(DirectContext)
