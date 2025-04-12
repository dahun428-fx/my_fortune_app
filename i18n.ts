// i18n.ts
export const locales = ['ko', 'en'] as const
export const defaultLocale = 'ko'

export type Locale = (typeof locales)[number]
