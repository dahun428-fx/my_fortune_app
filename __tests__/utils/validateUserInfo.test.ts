// __tests__/utils/validateUserInfo.test.ts
import { describe, it, expect } from 'vitest' // ✅ vitest import
import { UserInfo } from '@/stores/useUserStore'
import { validateUserInfo, getUserInfoError } from '@/utils/validateUserInfo'

describe('validateUserInfo', () => {
  it('성별과 생년월일이 올바르면 true를 반환한다', () => {
    const info = {
      name: '홍길동',
      gender: '남성',
      birth: '1990-01-01',
      birthTime: '12:00',
      calendarType: 'solar',
    } as UserInfo
    expect(validateUserInfo(info)).toBe(true)
  })

  it('성별이 없으면 false를 반환한다', () => {
    const info = {
      name: '홍길동',
      gender: '',
      birth: '1990-01-01',
      birthTime: '12:00',
      calendarType: 'solar',
    } as UserInfo
    expect(validateUserInfo(info)).toBe(false)
  })

  it('생년월일이 잘못된 형식이면 false를 반환한다', () => {
    const info = {
      name: '홍길동',
      gender: '남성',
      birth: '19900101',
      birthTime: '12:00',
      calendarType: 'solar',
    } as UserInfo
    expect(validateUserInfo(info)).toBe(false)
  })

  it('null일 경우 false를 반환한다', () => {
    expect(validateUserInfo(null)).toBe(false)
  })
})

describe('getUserInfoError', () => {
  it('성별과 생년월일이 모두 없을 때는 두 항목 반환', () => {
    const info = {
      name: '홍길동',
      gender: '',
      birth: '',
      birthTime: '',
      calendarType: 'solar',
    } as UserInfo
    expect(getUserInfoError(info)).toEqual(['성별', '생년월일'])
  })

  it('성별만 유효하지 않을 경우', () => {
    const info = {
      name: '홍길동',
      gender: '중성',
      birth: '1990-01-01',
      birthTime: '',
      calendarType: 'solar',
    } as UserInfo
    expect(getUserInfoError(info)).toEqual(['성별'])
  })

  it('생년월일만 유효하지 않을 경우', () => {
    const info = {
      name: '홍길동',
      gender: '남성',
      birth: '2024.01.01',
      birthTime: '',
      calendarType: 'solar',
    } as UserInfo
    expect(getUserInfoError(info)).toEqual(['생년월일'])
  })

  it('모두 유효한 경우 빈 배열 반환', () => {
    const info = {
      name: '홍길동',
      gender: '여성',
      birth: '1990-05-20',
      birthTime: '',
      calendarType: 'lunar',
    } as UserInfo
    expect(getUserInfoError(info)).toEqual([])
  })
})
