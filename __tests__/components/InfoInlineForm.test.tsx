import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import InfoInlineForm from '@/components/fortune/InfoInlineForm'
import { vi } from 'vitest'
import React from 'react'

const mockSetUserInfo = vi.fn()

vi.mock('@/stores/useUserStore', async () => {
  const actual =
    await vi.importActual<typeof import('@/stores/useUserStore')>('@/stores/useUserStore')
  return {
    ...actual,
    useUserStore: () => ({
      userInfo: {
        name: '홍길동',
        gender: '',
        birth: '',
        birthTime: '',
        calendarType: 'solar',
      },
      setUserInfo: mockSetUserInfo,
    }),
  }
})

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      male: '남성',
      female: '여성',
      gender: '성별',
      birth: '생년월일',
    }
    return dict[key] ?? key
  },
}))

describe('InfoInlineForm', () => {
  beforeEach(() => {
    mockSetUserInfo.mockClear()
  })

  it('calls setUserInfo when gender and birth are provided', async () => {
    render(<InfoInlineForm />)

    const maleButton = screen.getByRole('button', { name: '남성' })
    const birthInput = screen.getByLabelText('생년월일')

    act(() => {
      fireEvent.click(maleButton)
      fireEvent.change(birthInput, { target: { value: '1990-01-01' } })
    })

    await waitFor(() => {
      expect(mockSetUserInfo).toHaveBeenCalledWith({
        name: '홍길동',
        gender: '남성',
        birth: '1990-01-01',
        birthTime: '',
        calendarType: 'solar',
      })
    })
  })
})
