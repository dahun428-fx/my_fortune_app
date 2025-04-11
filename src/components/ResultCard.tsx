// components/common/ResultCard.tsx
'use client'

import { useTranslations } from 'next-intl'

type Props = {
  result: string
}

export default function ResultCard({ result }: Props) {
  const t = useTranslations()

  if (!result) return null

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow text-sm text-gray-700 whitespace-pre-wrap">
      🔮 <strong className="font-medium">{t('fortuneResultTitle')}</strong>
      <p className="mt-2">{result}</p>
    </div>
  )
}
