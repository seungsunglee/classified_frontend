import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

import LoadingButton from '@mui/lab/LoadingButton'

const ItemDirectButton = ({
  authUser,
  item,
  blocked,
  isBlocked,
  existingParticipant,
  onClickOpenDirectDialog,
  onClickOpenBlockDialog,
}) => {
  const router = useRouter()

  const defaultLabel = 'メッセージを送信する'

  const [label, setLabel] = useState(defaultLabel)
  const [onClick, setOnClick] = useState(undefined)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof authUser !== 'undefined') {
      if (authUser && authUser.isAuthenticated) {
        if (authUser.id !== item.author.id) {
          if (
            typeof blocked !== 'undefined' &&
            typeof existingParticipant !== 'undefined'
          ) {
            if (blocked) {
              setLabel('ブロックを解除する')
              setOnClick(() => onClickOpenBlockDialog)
              setLoading(false)
            } else {
              if (!existingParticipant) {
                if (!isBlocked) {
                  setOnClick(() => onClickOpenDirectDialog)
                  setLoading(false)
                } else {
                  setLabel('メッセージを送信できません')
                  setDisabled(true)
                  setLoading(false)
                }
              } else {
                setLabel('スレッドに移動する')
                setOnClick(
                  () => () =>
                    router.push(`/account/direct/${existingParticipant}`)
                )
                setLoading(false)
              }
            }
          }
        } else {
          setDisabled(true)
          setLoading(false)
        }
      } else {
        setOnClick(() => () => toast('ログインしてください'))
        setLoading(false)
      }
    }

    return () => {
      if (authUser && authUser.isAuthenticated) {
        setLabel(defaultLabel)
        setOnClick(() => () => toast('ログインしてください'))
        setDisabled(false)
      }
    }
  }, [
    authUser,
    blocked,
    isBlocked,
    existingParticipant,
    item.author.id,
    onClickOpenDirectDialog,
    onClickOpenBlockDialog,
    router,
  ])

  return (
    <LoadingButton
      variant='contained'
      fullWidth
      size='large'
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {label}
    </LoadingButton>
  )
}

export default ItemDirectButton
