// app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import '@/app/styles/tailwind.css'
import ClientWrapper from '@/components/ClientWrapper'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: '운세TMI',
  description: '당신의 하루를 알려주는 AI 운세 예측 서비스, 운세TMI에서 간편하게 확인하세요.',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${geist.variable} antialiased bg-[#FAEDEB]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientWrapper>{children}</ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
