// app/layout.tsx
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import '@/app/styles/tailwind.css'
import ClientWrapper from '@/components/ClientWrapper'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: '운세TMI',
  description: '당신의 하루를 알려주는 AI 운세 예측 서비스, 운세TMI에서 간편하게 확인하세요.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang="ko">
      <body className={`${geist.variable} antialiased bg-[#FAEDEB]`}>
        <NextIntlClientProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
