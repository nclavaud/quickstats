import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        '**/*.tsx',
        '**/{postcss,tailwind}.config.*',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
})
