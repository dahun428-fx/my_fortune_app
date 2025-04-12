'use client'

import { ReactNode } from 'react'
import { ToastProvider } from '@/context/ToastContext'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
