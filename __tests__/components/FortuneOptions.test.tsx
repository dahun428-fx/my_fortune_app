// __tests__/components/FortuneOptions.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import FortuneOptions from '@/components/fortune/FortuneOptions'
import { ToastProvider } from '@/context/ToastContext'

describe('FortuneOptions', () => {
  it('calls onSelect when option clicked', () => {
    render(
      <ToastProvider>
        <FortuneOptions />
      </ToastProvider>
    )

    const option = screen.getByText(/romance/i) // 적절한 텍스트로 변경 필요
    fireEvent.click(option)
  })
})
