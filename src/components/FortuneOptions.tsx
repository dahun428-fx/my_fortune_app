// components/FortuneOptions.tsx
'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/useUserStore'
import { useToast } from '@/context/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'

const OPTIONS = ['연애운', '금전운', '건강운', '직장운', '오늘의 한 줄 운세']

export default function FortuneOptions() {
  const { userInfo, setUserInfo, selectedFortune, setSelectedFortune } = useUserStore()
  const { showToast } = useToast()
  const [gender, setGender] = useState('')
  const [birth, setBirth] = useState('')
  const [shake, setShake] = useState(false)

  const showInfoBox = !(userInfo?.gender && userInfo?.birth) && !(gender && birth)

  useEffect(() => {
    if (gender && birth) {
      setUserInfo({
        name: userInfo?.name || '',
        gender,
        birth,
        birthTime: userInfo?.birthTime || '',
        calendarType: userInfo?.calendarType || '양력',
      })
    }
  }, [gender, birth])

  useEffect(() => {
    if (!userInfo?.gender && !userInfo?.birth) {
      setGender('')
      setBirth('')
      setSelectedFortune('')
    }
  }, [userInfo])

  const handleSelect = (option: string) => {
    if (!(userInfo?.gender && userInfo?.birth)) {
      showToast('성별과 생년월일을 먼저 입력해주세요.')
      setShake(true)
      setTimeout(() => setShake(false), 1000)
      return
    }
    setSelectedFortune(option)
  }

  return (
    <div className="w-full space-y-4">
      <AnimatePresence>
        {showInfoBox && (
          <motion.div
            key="infobox"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`bg-white p-4 rounded-xl shadow border ${
              shake ? 'border-red-400 animate-vibrate' : 'border-gray-200'
            }`}
          >
            <p className="text-sm text-gray-600 mb-2">간단한 정보를 입력해주세요</p>

            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">성별</label>
                <div className="flex gap-2">
                  {['남성', '여성'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${
                        gender === g
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-white text-gray-700 border-gray-300'
                      } transition`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">생년월일</label>
                <input
                  type="date"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <p className="text-sm text-gray-600 mb-1">궁금한 운세를 선택하세요</p>
        <div className="w-full flex flex-col gap-2">
          {OPTIONS.map((option) => (
            <label
              key={option}
              className={`flex items-center space-x-2 px-4 py-3 w-full rounded-xl border cursor-pointer transition ${
                selectedFortune === option
                  ? 'bg-pink-100 border-pink-400'
                  : 'bg-white border-gray-200'
              }`}
            >
              <input
                type="radio"
                name="fortune"
                value={option}
                checked={selectedFortune === option}
                onChange={() => handleSelect(option)}
                className="accent-pink-500"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-vibrate {
          animation: vibrate 0.6s ease-in-out;
        }

        @keyframes vibrate {
          0% { transform: translateX(0); }
          10% { transform: translateX(-2px); }
          20% { transform: translateX(2px); }
          30% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          50% { transform: translateX(-2px); }
          60% { transform: translateX(2px); }
          70% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          90% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
