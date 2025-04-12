// app/api/fortune/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { name, gender, birth, topic } = body

  // 👇 여기서 LLM API 호출 (예: Groq, OpenAI 등)
  const result = `🌟 ${name || '사용자'}님의 ${topic}에 대한 운세입니다.
성별은 ${gender}, 생일은 ${birth}로 분석했어요.
오늘 하루는 멋지게 펼쳐질 거예요! ✨`

  return NextResponse.json({ result })
}
