// stores/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserInfo = {
  name: string
  gender: string
  birth: string
  birthTime: string
  calendarType: 'solar' | 'lunar'
}

type State = {
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo | null) => void
  selectedFortune: string
  setSelectedFortune: (value: string) => void

  // 언어 관련 추가
  language: 'ko' | 'en'
  setLanguage: (lang: 'ko' | 'en') => void
  toggleLanguage: () => void
}

export const useUserStore = create<State>()(
  persist(
    (set, get) => ({
      userInfo: null,
      setUserInfo: info => set({ userInfo: info }),
      selectedFortune: '',
      setSelectedFortune: value => set({ selectedFortune: value }),

      // 추가된 부분
      language: 'ko',
      setLanguage: lang => set({ language: lang }),
      toggleLanguage: () => {
        const next = get().language === 'ko' ? 'en' : 'ko'
        set({ language: next })
      },
    }),
    {
      name: 'user-store', // localStorage key
    }
  )
)
