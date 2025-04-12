// components/common/ShakeWrapper.tsx
'use client'

import React, { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * 흔들림 효과를 줄 때 사용합니다.
 * trigger가 true일 경우 애니메이션이 실행됩니다.
 */

type ShakeWrapperProps = {
  children: ReactNode
  trigger: boolean
  className?: string
}

export default function ShakeWrapper({ children, trigger, className = '' }: ShakeWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={String(trigger)}
        initial={{ x: 0 }}
        animate={trigger ? { x: [0, -4, 4, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
