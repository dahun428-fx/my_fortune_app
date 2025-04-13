import type { UserInfo } from '@/stores/useUserStore'

type TranslatableKeys = 'gender' | 'calendarType' | 'topic'

const translations: Record<TranslatableKeys, Record<'ko' | 'en', Record<string, string>>> = {
  gender: {
    ko: { 남성: 'male', 여성: 'female' },
    en: { male: '남성', female: '여성' },
  },
  calendarType: {
    ko: { 양력: 'solar', 음력: 'lunar' },
    en: { solar: '양력', lunar: '음력' },
  },
  topic: {
    ko: {
      연애운: 'romance',
      금전운: 'money',
      건강운: 'health',
      직장운: 'career',
      '오늘의 한 줄 운세': 'daily',
    },
    en: {
      romance: '연애운',
      money: '금전운',
      health: '건강운',
      career: '직장운',
      daily: '오늘의 한 줄 운세',
    },
  },
}

/**
 * 클라이언트에서 영어 요청을 보낼 때 필요한 필드만 번역
 */
export function translateRequestToEnglish(
  info: UserInfo & { topic?: string; language: string }
): Omit<UserInfo, 'language'> & { topic?: string } {
  if (info.language !== 'ko') return info

  const translated: any = { ...info }

  for (const key of ['gender', 'calendarType', 'topic'] as TranslatableKeys[]) {
    const original = info[key]
    const mapped = translations[key]?.ko?.[original as string]
    if (mapped) translated[key] = mapped
  }

  return translated
}
