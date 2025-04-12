// __tests__/context/ToastContext.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest' // ✅ 핵심 변경
import { ToastProvider, useToast } from '@/context/ToastContext'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

function TestComponent() {
  const { showToast } = useToast()
  return <button onClick={() => showToast('테스트 메시지')}>Show Toast</button>
}

describe('ToastContext', () => {
  it('토스트 메시지를 표시하고 닫을 수 있다', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    // 토스트가 아직 없을 때
    expect(screen.queryByText('테스트 메시지')).toBeNull()

    // 버튼 클릭하여 토스트 표시
    fireEvent.click(screen.getByText('Show Toast'))
    expect(await screen.findByText('테스트 메시지')).toBeInTheDocument()

    // 닫기 버튼이 있을 경우 닫기
    fireEvent.click(screen.getByRole('button', { name: /닫기/i }))

    // 메시지가 사라질 때까지 대기
    await waitFor(() => {
      expect(screen.queryByText('테스트 메시지')).not.toBeInTheDocument()
    })
  })
})
