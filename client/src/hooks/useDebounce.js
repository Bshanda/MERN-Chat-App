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

// VanillaJs.

// function Debounce(cb, delay=500) {
//   let timeoutId
//   return (...args)=>{
//     clearTimeout(timeoutId)
//     timeoutId =setTimeout(() => {
//       cd(...args)
//     }, delay);
//   }
// }

// const debouncedValu = Debounce((a)=>{
//   console.log('Debounced value',a);
// })

// debouncedValu(1)
