'use client'

import { useToast } from '@/context/ToastContext'
import { Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { PiXLogoFill } from 'react-icons/pi'
import { FaFacebookSquare } from 'react-icons/fa' // ✅ Facebook 아이콘
import { useEffect } from 'react'

declare global {
  interface Window {
    Kakao: {
      init: (key: string | undefined) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (config: object) => void
      }
    }
  }
}

export default function ShareButtons({ result }: { result: string }) {
  const t = useTranslations('share')
  const toast = useToast()

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    toast.showToast(t('copyAlert'))
  }

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      toast.showToast('Kakao SDK 로드 실패')
      return
    }

    window.Kakao.Share.sendDefault({
      objectType: 'text',
      text: result,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    })
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}&hashtags=운세TMI,AI운세`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(result)}`

  return (
    <div className="mt-6 text-center text-sm">
      <p className="text-gray-500 mb-2">{t('label')}</p>
      <div className="flex justify-center gap-4 flex-wrap">
        {/* 복사 버튼 */}
        <button
          style={{ cursor: 'pointer' }}
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition"
        >
          <Copy size={16} />
        </button>

        {/* X(Twitter) 공유 */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-black hover:underline"
        >
          <PiXLogoFill size={16} />
        </a>

        {/* 카카오톡 공유 */}
        <button
          onClick={handleKakaoShare}
          className="hover:opacity-80 transition"
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
            alt="카카오톡 공유"
            width={18}
            height={16}
          />
        </button>

        {/* ✅ Facebook 공유 */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-700 hover:underline"
        >
          <FaFacebookSquare size={18} />
        </a>
      </div>
    </div>
  )
}
