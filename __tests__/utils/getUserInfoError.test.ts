// __tests__/utils/getUserInfoError.test.ts
import { getUserInfoError } from '@/utils/validateUserInfo'
import type { UserInfo } from '@/stores/useUserStore'

describe('getUserInfoError', () => {
  const base: UserInfo = {
    name: '',
    gender: '',
    birth: '',
    birthTime: '',
    calendarType: 'solar',
  }

  it('성별과 생년월일이 모두 없으면 ["성별", "생년월일"] 반환', () => {
    const result = getUserInfoError(base)
    expect(result).toEqual(['성별', '생년월일'])
  })

  it('성별만 없으면 ["성별"] 반환', () => {
    const result = getUserInfoError({
      ...base,
      birth: '1990-01-01',
    })
    expect(result).toEqual(['성별'])
  })

  it('생년월일만 없으면 ["생년월일"] 반환', () => {
    const result = getUserInfoError({
      ...base,
      gender: '남성',
    })
    expect(result).toEqual(['생년월일'])
  })

  it('모두 유효하면 [] 반환', () => {
    const result = getUserInfoError({
      ...base,
      gender: '남성',
      birth: '1990-01-01',
    })
    expect(result).toEqual([])
  })

  it('성별이 "남" 같은 잘못된 값이면 ["성별"] 반환', () => {
    const result = getUserInfoError({
      ...base,
      gender: '남',
      birth: '1990-01-01',
    })
    expect(result).toEqual(['성별'])
  })

  it('생년월일이 잘못된 형식이면 ["생년월일"] 반환', () => {
    const result = getUserInfoError({
      ...base,
      gender: '여성',
      birth: '19900101',
    })
    expect(result).toEqual(['생년월일'])
  })
})
