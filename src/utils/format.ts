// utils/format.ts

/**
 * 생년월일 포맷을 yyyy-mm-dd 형태로 통일 (정확히 yyyy-MM-dd 형식만 허용)
 */
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    // yyyy-mm-dd 형식이 아닐 경우 빈 문자열 반환
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return ''
    const parsed = new Date(date)
    if (isNaN(parsed.getTime())) return ''
    return date // 이미 yyyy-MM-dd 형식이므로 그대로 반환
  }

  if (date instanceof Date && !isNaN(date.getTime())) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return ''
}

/**
 * 이름을 익명 처리 (ex. 홍길동 → 홍**)
 */
export function anonymizeName(name: string): string {
  if (name.length <= 1) return name
  return name[0] + '*'.repeat(name.length - 1)
}

/**
 * 성별 약어 변환 (남성 → M, 여성 → F)
 */
export function formatGender(gender: string): string {
  if (gender === '남성') return 'M'
  if (gender === '여성') return 'F'
  return ''
}
