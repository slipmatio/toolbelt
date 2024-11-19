import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ['tests/unit/**/*.{test,spec}.ts', 'src/**/*.spec.ts'],
      environment: 'happy-dom',
      coverage: {
        exclude: ['__mocks__/*', 'tests/*', '**/*.spec.ts'],
        provider: 'v8',
        reporter: ['text', 'json', 'json-summary'],
      },
    },
  })
)
