'use client'

import { useState } from 'react'
import FortuneOptions from '@/components/FortuneOptions'
import ResultCard from '@/components/ResultCard'

export default function Home() {
  const [selected, setSelected] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (!selected) return
    setLoading(true)
    setTimeout(() => {
      setResult(`"${selected}"에 대한 운세 결과입니다.\n당신의 하루가 복되고 평안하길 기원합니다. ✨`)
      setLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-[#FAEDEB] flex flex-col justify-between p-6 pb-28">
      <div className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-xl font-light text-gray-800 tracking-wide text-center">
          오늘의 운세 🔮
        </h1>

        <FortuneOptions selected={selected} onSelect={setSelected} />
        <ResultCard result={result} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300">
        <button
          onClick={handleClick}
          disabled={!selected || loading}
          className="w-full py-3 rounded-full bg-pink-200 text-gray-700 font-medium shadow-md hover:bg-pink-300 transition disabled:opacity-50"
        >
          {loading ? '점 보는 중...' : '운세 보기'}
        </button>
      </div>
    </main>
  )
}
