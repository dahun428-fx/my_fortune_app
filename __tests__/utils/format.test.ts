// __tests__/utils/format.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate, anonymizeName, formatGender } from '@/utils/format'

describe('formatDate', () => {
  it('returns valid yyyy-MM-dd string as-is', () => {
    expect(formatDate('2024-12-31')).toBe('2024-12-31')
  })

  it('returns empty string for invalid string date', () => {
    expect(formatDate('20241231')).toBe('')
    expect(formatDate('2024/12/31')).toBe('')
    expect(formatDate('abcd')).toBe('')
  })

  it('formats valid Date object to yyyy-MM-dd', () => {
    const date = new Date('2024-12-31')
    expect(formatDate(date)).toBe('2024-12-31')
  })

  it('returns empty string for invalid Date object', () => {
    const invalidDate = new Date('invalid')
    expect(formatDate(invalidDate)).toBe('')
  })
})

describe('anonymizeName', () => {
  it('anonymizes a name with length > 1', () => {
    expect(anonymizeName('홍길동')).toBe('홍**')
    expect(anonymizeName('이')).toBe('이')
    expect(anonymizeName('김민수')).toBe('김**')
  })

  it('returns original name for single character', () => {
    expect(anonymizeName('나')).toBe('나')
  })
})

describe('formatGender', () => {
  it('returns M for 남성', () => {
    expect(formatGender('남성')).toBe('M')
  })

  it('returns F for 여성', () => {
    expect(formatGender('여성')).toBe('F')
  })

  it('returns empty string for unknown input', () => {
    expect(formatGender('기타')).toBe('')
    expect(formatGender('')).toBe('')
  })
})
