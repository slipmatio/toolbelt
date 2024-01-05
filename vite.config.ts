import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'
// import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      copyDtsFiles: true,
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'toolbelt',
      fileName: 'toolbelt',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
        },
      },
    },
  },
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
