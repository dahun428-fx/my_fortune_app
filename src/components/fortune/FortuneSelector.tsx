// components/fortune/FortuneSelector.tsx
'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { FORTUNE_OPTIONS } from '@/config/fortuneOptions'

type Props = {
  selected: string
  onSelect: (value: string) => void
}

export default function FortuneSelector({ selected, onSelect }: Props) {
  const t = useTranslations()

  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">{t('selectFortuneType')}</p>
      <div className="w-full flex flex-col gap-2">
        {FORTUNE_OPTIONS.map(option => (
          <label
            key={option}
            className={`flex items-center space-x-2 px-4 py-3 w-full rounded-xl border cursor-pointer transition ${
              selected === option ? 'bg-pink-100 border-pink-400' : 'bg-white border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="fortune"
              value={option}
              checked={selected === option}
              onChange={() => onSelect(option)}
              className="accent-pink-500"
            />
            <span className="text-gray-800">{t(option)}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
