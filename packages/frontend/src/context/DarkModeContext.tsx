// src/context/DarkModeContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react'

interface DarkModeContextType {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
)

interface DarkModeProviderProps {
  children: ReactNode
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('dark-mode')
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    const className = 'dark'
    const bodyClass = window.document.body.classList
    isDarkMode ? bodyClass.add(className) : bodyClass.remove(className)
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
