// components/fortune/InfoInlineForm.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/useUserStore'
import { useTranslations } from 'next-intl'

export default function InfoInlineForm() {
  const { userInfo, setUserInfo } = useUserStore()
  const [gender, setGender] = useState('')
  const [birth, setBirth] = useState('')
  const t = useTranslations()

  useEffect(() => {
    if (!userInfo?.gender && !userInfo?.birth) {
      setGender('')
      setBirth('')
    }
  }, [userInfo])

  useEffect(() => {
    if (gender && birth) {
      setUserInfo({
        name: userInfo?.name || '',
        gender,
        birth,
        birthTime: userInfo?.birthTime || '',
        calendarType: userInfo?.calendarType || 'solar',
      })
    }
  }, [gender, birth])

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{t('gender')}</label>
        <div className="flex gap-2">
          {[t('male'), t('female')].map((label, idx) => (
            <button
              key={label}
              id={`gender-${idx}`}
              onClick={() => setGender(label)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                gender === label
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'bg-white text-gray-700 border-gray-300'
              } transition`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="birth" className="text-sm text-gray-600 mb-1">
          {t('birth')}
        </label>
        <input
          id="birth"
          type="date"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>
    </div>
  )
}
