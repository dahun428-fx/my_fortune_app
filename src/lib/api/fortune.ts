import apiClient from './axios'
import { translateRequestToEnglish } from './translateRequest'
import type { UserInfo } from '@/stores/useUserStore'

/**
 * 서버에 운세 요청을 보냅니다.
 * 언어가 한국어(ko)일 경우, 영어로 번역한 값을 전송합니다.
 */
export async function getFortune(data: UserInfo & { topic?: string; language: string }) {
  const translated = translateRequestToEnglish(data)

  const response = await apiClient.post('/fortune', translated)
  return response.data.result as string
}
