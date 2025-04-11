// utils/format.ts

/**
 * 생년월일 포맷을 yyyy-mm-dd 형태로 통일
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
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