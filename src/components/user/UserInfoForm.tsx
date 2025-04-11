// components/user/UserInfoForm.tsx
'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useUserStore } from '@/stores/useUserStore'
import type { UserInfo } from '@/stores/useUserStore'

type Props = {
  onSubmit: (info: UserInfo) => void
  defaultValue?: UserInfo
}

export default function UserInfoForm({ onSubmit, defaultValue }: Props) {
  const t = useTranslations()
  const { userInfo, setUserInfo } = useUserStore()

  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [birth, setBirth] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar')

  useEffect(() => {
    const source = defaultValue || userInfo
    if (source) {
      setName(source.name || '')
      setGender(source.gender || '')
      setBirth(source.birth || '')
      setBirthTime(source.birthTime || '')
      setCalendarType((source.calendarType as 'solar' | 'lunar') || 'solar')
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
      calendarType: 'solar',
    }
    setUserInfo(empty)
    setName('')
    setGender('')
    setBirth('')
    setBirthTime('')
    setCalendarType('solar')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{t('name')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-gray-600 mb-1">{t('gender')}</label>
          <div className="flex gap-2">
            {[t('male'), t('female')].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setGender(label)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  gender === label
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-600 mb-1">{t('birth')}</label>
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
          <label className="text-sm text-gray-600 mb-1">{t('birthTime')}</label>
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-600 mb-1">{t('calendarType')}</label>
          <select
            value={calendarType}
            onChange={(e) => setCalendarType(e.target.value as 'solar' | 'lunar')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="solar">{t('solar')}</option>
            <option value="lunar">{t('lunar')}</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-3 rounded-full bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition"
        >
          {t('viewFortune')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        >
          {t('reset')}
        </button>
      </div>
    </form>
  )
}