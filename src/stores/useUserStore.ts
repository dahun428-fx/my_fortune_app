// stores/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserInfo = {
  name: string
  gender: string
  birth: string
  birthTime: string
  calendarType: '양력' | '음력'
}

type State = {
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo) => void
  selectedFortune: string
  setSelectedFortune: (value: string) => void
}

export const useUserStore = create<State>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      selectedFortune: '',
      setSelectedFortune: (value) => set({ selectedFortune: value }),
    }),
    {
      name: 'user-store', // localStorage key
    }
  )
)