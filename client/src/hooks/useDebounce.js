import { useEffect, useState } from 'react'

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value?.toLowerCase())
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])
  return debouncedValue
}
