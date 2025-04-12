// lib/api/fortune.ts
import apiClient from './axios'

export async function getFortune(data: {
  name?: string
  gender: string
  birth: string
  topic: string
}) {
  const response = await apiClient.post('/fortune', data)
  return response.data.result as string
}
