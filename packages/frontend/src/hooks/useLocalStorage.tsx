import { useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Initialize state with the value from localStorage or the initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      // Parse and return the value or return the initial value
      return item
        ? JSON.parse(item)
        : typeof initialValue === 'function'
          ? (initialValue as () => T)()
          : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue
    }
  })

  // Set a new value in localStorage and update state
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove the value from localStorage and reset state
  const removeValue = () => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue] as const
}

export default useLocalStorage
