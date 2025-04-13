'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import UserInfoForm from '@/components/user/UserInfoForm'
import FortuneOptions from '@/components/fortune/FortuneOptions'
import ResultCard from '@/components/ResultCard'
import { useUserStore } from '@/stores/useUserStore'
import type { UserInfo } from '@/stores/useUserStore'
import { validateUserInfo } from '@/utils/validateUserInfo'
import { useToast } from '@/context/ToastContext'
import { getFortune } from '@/lib/api/fortune'

export default function Home() {
  const t = useTranslations()
  const toast = useToast()
  const { userInfo, setUserInfo, selectedFortune } = useUserStore()
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'user' | 'fortune' | null>('fortune')
  const [nextTab, setNextTab] = useState<'user' | 'fortune' | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleShowUserForm = () => {
    setNextTab(activeTab ? 'user' : null)
    setActiveTab(activeTab ? null : 'user')
  }

  const handleShowFortuneForm = () => {
    setNextTab(activeTab ? 'fortune' : null)
    setActiveTab(activeTab ? null : 'fortune')
  }

  const handleUserSubmit = (info: UserInfo) => {
    setUserInfo(info)
    setActiveTab('fortune')
  }

  const handleFortuneClick = async () => {
    const isValidUser = validateUserInfo(userInfo)
    if (!isValidUser) {
      toast.showToast(t('requiredGenderBirth'))
      return
    }
    if (!selectedFortune) {
      toast.showToast(t('requiredFortune'))
      return
    }

    setLoading(true)
    setShowResult(false)

    try {
      const response = await getFortune({
        name: userInfo?.name ?? '',
        gender: userInfo!.gender,
        birth: userInfo!.birth,
        birth_time: userInfo?.birthTime ?? '',
        calendar_type: userInfo?.calendarType ?? 'solar',
        topic: selectedFortune,
        language: userInfo?.language ?? 'ko',
      })

      setResult(response || t('defaultFallbackFortune'))
    } catch (error) {
      console.error(error)
      toast.showToast(t('errorFetchingFortune'))
    } finally {
      setActiveTab(null)
      setTimeout(() => {
        setShowResult(true)
        setLoading(false)
      }, 500)
    }
  }

  useEffect(() => {
    if (!activeTab && nextTab) {
      const timeout = setTimeout(() => {
        setActiveTab(nextTab)
        setNextTab(null)
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [activeTab, nextTab])

  return (
    <main className="min-h-screen bg-[#FAEDEB] flex flex-col items-center p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center text-pink-700">{t('title')}</h1>

        {/* 사용자 정보 버튼 */}
        <button
          onClick={handleShowUserForm}
          className={`w-full flex items-center justify-between rounded-xl p-4 shadow text-left font-medium transition ${
            activeTab === 'user'
              ? 'bg-pink-100 text-pink-700 border border-pink-300'
              : 'bg-white text-gray-700 hover:bg-pink-50'
          }`}
        >
          <span>
            👤{' '}
            {userInfo
              ? `${userInfo.name || t('user')} / ${userInfo.gender || '-'} / ${userInfo.birth || '-'} / ${
                  userInfo.birthTime || '-'
                }`
              : t('userInfo')}
          </span>
          {activeTab === 'user' && (
            <span
              onClick={() => setActiveTab(null)}
              className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </span>
          )}
        </button>

        <AnimatePresence mode="wait">
          {activeTab === 'user' && (
            <motion.div
              key="userform"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <UserInfoForm onSubmit={handleUserSubmit} defaultValue={userInfo ?? undefined} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 운세 탭 */}
        <button
          onClick={handleShowFortuneForm}
          className={`w-full flex items-center justify-between rounded-xl p-4 shadow text-left font-medium transition ${
            activeTab === 'fortune'
              ? 'bg-pink-100 text-pink-700 border border-pink-300'
              : 'bg-white text-gray-700 hover:bg-pink-50'
          }`}
        >
          <span>🌙 {t('fortune')}</span>
          {activeTab === 'fortune' && (
            <span
              onClick={() => setActiveTab(null)}
              className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </span>
          )}
        </button>

        <AnimatePresence mode="wait">
          {activeTab === 'fortune' && (
            <motion.div
              key="fortuneform"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <FortuneOptions />
              <div className="mt-4">
                <button
                  onClick={handleFortuneClick}
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition disabled:opacity-50"
                >
                  {loading ? t('viewingFortune') : t('viewFortune')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 로딩 */}
        {loading && (
          <div className="w-full flex justify-center items-center">
            <div className="mt-4 w-8 h-8 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* 결과 */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6 }}
              className="mt-6"
            >
              <ResultCard result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
