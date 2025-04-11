// app/page.tsx
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import UserInfoForm from '@/components/UserInfoForm'
import FortuneOptions from '@/components/FortuneOptions'
import ResultCard from '@/components/ResultCard'
import { useUserStore } from '@/stores/useUserStore'
import type { UserInfo } from '@/stores/useUserStore'

export default function Home() {
  const { userInfo, setUserInfo, selectedFortune } = useUserStore()
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'user' | 'fortune' | null>(null)

  const toggleTab = (tab: 'user' | 'fortune') => {
    setActiveTab((prev) => (prev === tab ? null : tab))
  }

  const handleShowUserForm = () => toggleTab('user')
  const handleShowFortuneForm = () => toggleTab('fortune')

  const handleUserSubmit = (info: UserInfo) => {
    setUserInfo(info)
    setActiveTab('fortune')
  }

  const handleFortuneClick = () => {
    if (!selectedFortune) return
    setLoading(true)
    setTimeout(() => {
      const name = userInfo?.name ? `${userInfo.name}님, ` : ''
      setResult(`${name}"${selectedFortune}"에 대한 운세 결과입니다.\n오늘도 좋은 하루 되세요! ✨`)
      setLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-[#FAEDEB] flex flex-col items-center p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center text-pink-700">운세TMI 🔮</h1>

        <button
          onClick={handleShowUserForm}
          className={`w-full flex items-center justify-between rounded-xl p-4 shadow text-left font-medium transition ${
            activeTab === 'user'
              ? 'bg-pink-100 text-pink-700 border border-pink-300'
              : 'bg-white text-gray-700 hover:bg-pink-50'
          }`}
        >
          <span>👤 {userInfo
            ? `${userInfo.name || '사용자'} / ${userInfo.gender || '-'} / ${userInfo.birth || '-'} / ${userInfo.birthTime || '-'} `
            : '사용자 정보 입력'}</span>
          {activeTab === 'user' && (
            <span onClick={() => setActiveTab(null)} className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">
              ✕
            </span>
          )}
        </button>

        <AnimatePresence>
          {activeTab === 'user' && (
            <motion.div
              key="userform"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <UserInfoForm onSubmit={handleUserSubmit} defaultValue={userInfo ?? undefined} />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleShowFortuneForm}
          className={`w-full flex items-center justify-between rounded-xl p-4 shadow text-left font-medium transition ${
            activeTab === 'fortune'
              ? 'bg-pink-100 text-pink-700 border border-pink-300'
              : 'bg-white text-gray-700 hover:bg-pink-50'
          }`}
        >
          <span>🌙 오늘의 운세</span>
          {activeTab === 'fortune' && (
            <span onClick={() => setActiveTab(null)} className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">
              ✕
            </span>
          )}
        </button>

        <AnimatePresence>
          {activeTab === 'fortune' && (
            <motion.div
              key="fortuneform"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <FortuneOptions />
              <ResultCard result={result} />
              <div className="mt-4">
                <button
                  onClick={handleFortuneClick}
                  disabled={!selectedFortune || loading}
                  className="w-full py-3 rounded-full bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition disabled:opacity-50"
                >
                  {loading ? '점 보는 중...' : '운세 보기'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}