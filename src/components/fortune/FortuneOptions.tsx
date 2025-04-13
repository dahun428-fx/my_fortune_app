// components/fortune/FortuneOptions.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/useUserStore'
import { useToast } from '@/context/ToastContext'
import { AnimatePresence, motion } from 'framer-motion'
import FortuneSelector from '@/components/fortune/FortuneSelector'
import InfoInlineForm from '@/components/fortune/InfoInlineForm'
import ShakeWrapper from '@/components/common/ShakeWrapper'
import { validateUserInfo } from '@/utils/validateUserInfo'

export default function FortuneOptions() {
  const { userInfo, setSelectedFortune, selectedFortune } = useUserStore()
  const { showToast } = useToast()
  const [shake, setShake] = useState(false)

  const isInfoInvalid = !validateUserInfo(userInfo)

  useEffect(() => {
    if (isInfoInvalid) {
      setSelectedFortune('')
    }
  }, [userInfo, isInfoInvalid, setSelectedFortune])

  const handleSelect = (option: string) => {
    if (isInfoInvalid) {
      showToast('성별과 생년월일을 먼저 입력해주세요.')
      setShake(true)
      setTimeout(() => setShake(false), 1000)
      return
    }
    setSelectedFortune(option)
  }

  return (
    <div className="w-full space-y-4">
      <AnimatePresence mode="wait">
        {isInfoInvalid && (
          <motion.div
            key="infoform"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ShakeWrapper trigger={shake}>
              <div className="bg-white p-4 rounded-xl shadow border border-red-400">
                <p className="text-sm text-gray-600 mb-2">간단한 정보를 입력해주세요</p>
                <InfoInlineForm />
              </div>
            </ShakeWrapper>
          </motion.div>
        )}
      </AnimatePresence>

      <FortuneSelector selected={selectedFortune} onSelect={handleSelect} />
    </div>
  )
}
