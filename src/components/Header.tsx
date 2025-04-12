// components/common/FortuneButton.tsx
'use client'

import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations()

  return (
    <h1 className="text-xl font-light text-gray-800 tracking-wide text-center">
      {t('todayFortune')} 🔮
    </h1>
  )
}
