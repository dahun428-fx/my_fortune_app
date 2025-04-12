// __mocks__/next-intl.ts
export const useTranslations = () => (key: string) => {
  const map: Record<string, string> = {
    name: '이름',
    gender: '성별',
    birth: '생년월일',
    birthTime: '출생 시각',
    calendarType: '양력 / 음력',
    male: '남성',
    female: '여성',
    viewFortune: '운세 보러 가기',
    reset: '초기화',
  }
  return map[key] ?? key
}

export const NextIntlClientProvider = ({ children }: { children: React.ReactNode }) => children
