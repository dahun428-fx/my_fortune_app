import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "AI 점보기",
  description: "Groq 기반 운세 예측 서비스",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} antialiased bg-[#FAEDEB]`}>
        {children}
      </body>
    </html>
  )
}
