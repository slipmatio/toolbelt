import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: './tsconfig.app.json', include: ['src/**/*.ts', 'src/**/*.vue'], rollupTypes: true }),
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
        toolbelt: resolve(__dirname, 'src/toolbelt.ts'),
        'vue/index': resolve(__dirname, 'src/vue/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'js' : 'cjs'
        return `${entryName}.${extension}`
      },
    },
    rollupOptions: {
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
