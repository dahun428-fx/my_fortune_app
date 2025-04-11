'use client'
import { useEffect } from 'react'

type Props = {
  message: string
  onClose: () => void
}

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-50">
      {message}
    </div>
  )
}
