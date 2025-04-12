// context/ToastContext.tsx
'use client'

import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react'
import Toast from '@/components/common/Toast'

interface ToastContextType {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
  }, [])

  const handleClose = () => setMessage('')

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <Toast message={message} onClose={handleClose} />}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}
