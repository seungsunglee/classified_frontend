import { useState } from 'react'

import { toast } from 'react-toastify'

const useFieldErrors = ({ setError }) => {
  const [nonFieldErrors, setNonFieldErrors] = useState(null)

  const setFieldErrors = (error) => {
    if (error.response) {
      if (error.response.status !== 500) {
        if (error.response.data.non_field_errors) {
          setNonFieldErrors(error.response.data.non_field_errors)
        } else {
          Object.keys(error.response.data).forEach((key, index) => {
            if (index === 0) {
              setError(
                key,
                { message: error.response.data[key] },
                { shouldFocus: true }
              )
            } else {
              setError(key, { message: error.response.data[key] })
            }
          })
        }
      } else {
        toast('エラーが発生しました')
      }
    } else {
      toast('エラーが発生しました')
    }
  }

  return { nonFieldErrors, setNonFieldErrors, setFieldErrors }
}

export default useFieldErrors
