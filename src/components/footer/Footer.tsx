'use client'

import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="mt-16 px-6 py-8 border-t border-pink-100 text-center text-sm text-gray-500 bg-white">
      <div className="space-y-1">
        <p>{t('copyright')}</p>
        <p>
          {t('madeBy')}{' '}
          <a
            href="https://github.com/dahun428-fx"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-pink-600"
          >
            {t('github')}
          </a>
        </p>
        <p className="text-xs text-gray-400">{t('poweredBy')}</p>
        <p className="text-xs text-gray-400">{t('testNotice')}</p>
        <p className="text-xs">
          <a href={`mailto:${t('contact')}`} className="underline hover:text-pink-600">
            {t('contact')} {t('email')}
          </a>
        </p>
      </div>
    </footer>
  )
}
