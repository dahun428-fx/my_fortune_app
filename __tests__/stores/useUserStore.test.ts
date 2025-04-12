// __tests__/stores/useUserStore.test.ts
import { act } from 'react'
import { describe, it, expect, beforeAll, beforeEach } from 'vitest' // ✅ vitest에서 import
import { renderHook } from '@testing-library/react'
import { useUserStore } from '@/stores/useUserStore'
import type { UserInfo } from '@/stores/useUserStore'

// persist 때문에 localStorage mocking
beforeAll(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
      getItem(key: string) {
        return store[key] || null
      },
      setItem(key: string, value: string) {
        store[key] = value.toString()
      },
      clear() {
        store = {}
      },
      removeItem(key: string) {
        delete store[key]
      },
    }
  })()

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  })
})

describe('useUserStore (with persist)', () => {
  beforeEach(() => {
    act(() => {
      useUserStore.setState({
        userInfo: null,
        selectedFortune: '',
      })
    })
  })

  it('초기값은 userInfo: null, selectedFortune: ""', () => {
    const { result } = renderHook(() => useUserStore())
    expect(result.current.userInfo).toBeNull()
    expect(result.current.selectedFortune).toBe('')
  })

  it('setUserInfo로 유저 정보를 설정할 수 있다', () => {
    const { result } = renderHook(() => useUserStore())
    const userInfo: UserInfo = {
      name: '홍길동',
      gender: '남성',
      birth: '1990-01-01',
      birthTime: '12:00',
      calendarType: 'solar',
    }

    act(() => {
      result.current.setUserInfo(userInfo)
    })

    expect(result.current.userInfo).toEqual(userInfo)
  })

  it('setSelectedFortune으로 운세 타입을 설정할 수 있다', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.setSelectedFortune('연애운')
    })

    expect(result.current.selectedFortune).toBe('연애운')
  })
})
