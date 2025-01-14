import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        '**/{postcss,tailwind}.config.*',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
})