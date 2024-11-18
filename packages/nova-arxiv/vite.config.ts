import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' }
// import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),

    // crx插件会处理popup options对应页面 无须再使用createHtmlPlugin
    // createHtmlPlugin({
    //   pages: [
    //     {
    //       entry: 'src/popup/main.ts',
    //       filename: 'popup.html',
    //       template: 'src/popup/popup.html',
    //     },
    //     {
    //       entry: 'src/options/main.ts',
    //       filename: 'options.html',
    //       template: 'src/options/options.html',
    //     }
    //   ],
    // }),

    crx({ manifest }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // 使用crx插件 无须再手动使用build配置popup options页面
  // build: {
  //   rollupOptions: {
  //     input: {
  //       popup: resolve(__dirname, 'src/popup/popup.html'),
  //       options: resolve(__dirname, 'src/options/options.html'),
  //     }
  //   }
  // }
})
