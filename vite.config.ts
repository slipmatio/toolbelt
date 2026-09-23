import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: './tsconfig.app.json', include: ['src/**/*.ts', 'src/**/*.vue'], bundleTypes: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        toolbelt: resolve(import.meta.dirname, 'src/toolbelt.ts'),
        'vue/index': resolve(import.meta.dirname, 'src/vue/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => {
        return `${entryName}.js`
      },
    },
    rolldownOptions: {
      external: ['vue', 'vue-router'],
      output: {
        preserveModules: false,
        globals: {
          vue: 'Vue',
          'vue-router': 'vueRouter',
        },
      },
    },
  },
})
