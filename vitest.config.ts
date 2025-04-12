import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      clean: true, // 🔥 Next.js 자동 생성 파일을 제외
      exclude: ['**/__tests__/**', '.next/**'], // .next 빌드 폴더 제외
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'next-intl': path.resolve(__dirname, '__mocks__/next-intl.ts'),
    },
  },
})
