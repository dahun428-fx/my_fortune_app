// __tests__/lib/api/fortune.test.ts
import { describe, it, expect, vi } from 'vitest'
import { getFortune } from '@/lib/api/fortune'

vi.mock('@/lib/api/axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { result: '운세 내용' } })),
  },
}))

describe('getFortune', () => {
  it('calls axios with correct params', async () => {
    const data = {
      name: '홍길동',
      gender: '남성',
      birth: '1991-04-29',
      birthTime: '13:00',
      calendarType: 'solar',
      topic: '사랑운',
    }

    const result = await getFortune(data)
    expect(result).toBe('운세 내용')
  })
})
