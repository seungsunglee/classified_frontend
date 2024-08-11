import { createContext, useContext, useState, useEffect } from 'react'

import { useRouter } from 'next/router'

const HistoryContext = createContext()

export const HistoryProvider = ({ children }) => {
  const { asPath } = useRouter()
  const [history, setHistory] = useState([])
  useEffect(() => {
    setHistory((prev) => {
      if (prev.length > 0) {
        if (prev[prev.length - 1] !== asPath) {
          return [prev[prev.length - 1], asPath]
        }
        return prev
      } else {
        return [asPath]
      }
    })
  }, [asPath])

  return (
    <HistoryContext.Provider value={{ history }}>
      {children}
    </HistoryContext.Provider>
  )
}

export const useHistory = () => useContext(HistoryContext)
