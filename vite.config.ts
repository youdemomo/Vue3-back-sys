import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 引入mock插件
import { viteMockServe } from 'vite-plugin-mock'
// setup语法糖组件命名
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 保证只有开发阶段能使用mock接口
        localEnabled: command === 'serve',
      }),
      VueSetupExtend(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用@代替src
      },
    },
    // 配置scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    // 设置代理服务器
    server: {
      proxy: {
        '/api': {
          // 服务器地址
          target: 'http://sph-api.atguigu.cn',
          // 需要代理跨域
          changeOrigin: true,
          // 请求路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
