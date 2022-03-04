/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import dts from 'vite-plugin-dts'

process.env.VITE_APP_VERSION = pkg.version
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  plugins: [
    vue({
      script: {
        refSugar: true,
      },
    }),
    dts({
      staticImport: true,
      // copyDtsFiles: false,
      // skipDiagnostics: false,
      // logDiagnostics: true,
    }),
  ],

  test: {
    include: ['tests/unit/**/*.{test,spec}.ts'],
  },

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
        browser: resolve(__dirname, 'src/browser.ts'),
      },
      external: ['vue'],
      output: {
        dir: resolve(__dirname, 'dist'),
        format: 'es',
        entryFileNames: '[name].[format].js',
        // globals: {
        //   vue: 'Vue',
        // },
      },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
})
