// components/common/QuestionInput.tsx
'use client'

import { useTranslations } from 'next-intl'

type Props = {
  question: string
  onChange: (value: string) => void
}

export default function QuestionInput({ question, onChange }: Props) {
  const t = useTranslations()

  return (
    <input
      type="text"
      placeholder={t('enterQuestion')}
      value={question}
      onChange={e => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
    />
  )
}
