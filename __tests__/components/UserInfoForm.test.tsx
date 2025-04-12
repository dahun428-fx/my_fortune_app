// __tests__/components/UserInfoForm.test.tsx
import React from 'react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import UserInfoForm from '../../src/components/user/UserInfoForm'
import { UserInfo } from '../../src/stores/useUserStore'

const mockSubmit = vi.fn()

const defaultUser: UserInfo = {
  name: '홍길동',
  gender: '남성',
  birth: '1990-01-01',
  birthTime: '12:00',
  calendarType: 'solar',
}

// ✅ test용 messages 객체
const messages = {
  name: '이름',
  gender: '성별',
  birth: '생년월일',
  birthTime: '출생 시각',
  calendarType: '양력 / 음력',
  viewFortune: '운세 보러 가기',
  reset: '초기화',
  male: '남성',
  female: '여성',
}

function renderWithProvider(user: UserInfo) {
  return render(
    <NextIntlClientProvider locale="ko" messages={messages} timeZone="Asia/Seoul" now={new Date()}>
      <UserInfoForm onSubmit={mockSubmit} defaultValue={user} />
    </NextIntlClientProvider>
  )
}

describe('UserInfoForm', () => {
  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('입력 필드를 채우고 제출하면 onSubmit이 호출된다', () => {
    renderWithProvider(defaultUser)

    fireEvent.change(screen.getByLabelText('이름'), {
      target: { value: '김철수' },
    })
    fireEvent.click(screen.getByText('여성'))
    fireEvent.change(screen.getByLabelText('생년월일'), {
      target: { value: '1999-12-31' },
    })
    fireEvent.change(screen.getByLabelText('출생 시각'), {
      target: { value: '09:30' },
    })
    fireEvent.change(screen.getByLabelText('양력 / 음력'), {
      target: { value: 'lunar' },
    })

    fireEvent.click(screen.getByRole('button', { name: '운세 보러 가기' }))

    expect(mockSubmit).toHaveBeenCalledWith({
      name: '김철수',
      gender: '여성',
      birth: '1999-12-31',
      birthTime: '09:30',
      calendarType: 'lunar',
    })
  })

  it('초기화 버튼 클릭 시 모든 필드가 초기화된다', () => {
    renderWithProvider(defaultUser)

    fireEvent.click(screen.getByRole('button', { name: '초기화' }))

    expect(screen.getByLabelText('이름')).toHaveValue('')
    expect(screen.getByLabelText('생년월일')).toHaveValue('')
    expect(screen.getByLabelText('출생 시각')).toHaveValue('')
    expect(screen.getByLabelText('양력 / 음력')).toHaveValue('solar')
  })
})
