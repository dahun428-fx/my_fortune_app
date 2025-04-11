// components/UserInfoForm.tsx
'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/useUserStore'
import type { UserInfo } from '@/stores/useUserStore'

type Props = {
  onSubmit: (info: UserInfo) => void
  defaultValue?: UserInfo
}

export default function UserInfoForm({ onSubmit, defaultValue }: Props) {
  const { userInfo, setUserInfo } = useUserStore()

  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [birth, setBirth] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [calendarType, setCalendarType] = useState<'양력' | '음력'>('양력')

  useEffect(() => {
    const source = defaultValue || userInfo
    if (source) {
      setName(source.name || '')
      setGender(source.gender || '')
      setBirth(source.birth || '')
      setBirthTime(source.birthTime || '')
      setCalendarType(source.calendarType || '양력')
    }
  }, [defaultValue, userInfo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const info: UserInfo = { name, gender, birth, birthTime, calendarType }
    setUserInfo(info)
    onSubmit(info)
  }

  const handleReset = () => {
    const empty: UserInfo = {
      name: '',
      gender: '',
      birth: '',
      birthTime: '',
      calendarType: '양력',
    }
    setUserInfo(empty)
    setName('')
    setGender('')
    setBirth('')
    setBirthTime('')
    setCalendarType('양력')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-gray-600 mb-1">성별</label>
          <div className="flex gap-2">
            {['남성', '여성'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  gender === g
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-600 mb-1">생년월일</label>
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-gray-600 mb-1">출생 시각</label>
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-600 mb-1">양/음력</label>
          <select
            value={calendarType}
            onChange={(e) => setCalendarType(e.target.value as '양력' | '음력')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="양력">양력</option>
            <option value="음력">음력</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-3 rounded-full bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition"
        >
          운세 보러 가기
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        >
          초기화
        </button>
      </div>
    </form>
  )
}