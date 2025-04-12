// config/fortuneOptions.ts
export const FORTUNE_OPTIONS = ['romance', 'money', 'health', 'career', 'daily'] as const

export type FortuneType = (typeof FORTUNE_OPTIONS)[number]
