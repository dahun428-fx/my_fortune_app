// utils/validateUserInfo.ts
import type { UserInfo } from '@/stores/useUserStore'

/**
 * 유저 정보가 필수 입력값을 충족했는지 검증합니다
 * - gender: 존재하고 "남성" 또는 "여성"인지
 * - birth: yyyy-mm-dd 형식으로 존재하는지
 */
export function validateUserInfo(info: UserInfo | null): boolean {
  if (!info) return false
  const validGender = info.gender === '남성' || info.gender === '여성'
  const validBirth = /^\d{4}-\d{2}-\d{2}$/.test(info.birth ?? '')
  return validGender && validBirth
}

/**
 * 필수 정보가 누락되었을 경우 어떤 항목이 누락되었는지 반환합니다
 */
export function getUserInfoError(info: UserInfo): string[] {
  const errors: string[] = []
  if (!info.gender || (info.gender !== '남성' && info.gender !== '여성')) {
    errors.push('성별')
  }
  if (!info.birth || !/^\d{4}-\d{2}-\d{2}$/.test(info.birth)) {
    errors.push('생년월일')
  }
  return errors
}