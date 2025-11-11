import { join } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },

  /* 配置文件 */
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ['defineStore', 'definePiniaStore']
        ]
      }
    ],
    '@unocss/nuxt',
    // '@nuxtjs/eslint-module', //谨慎开启，会报错很多地方，主要用来检查一些函数是否用值,或者console，建议开发完之后使用
    '@nuxtjs/svg-sprite',
    '@nuxt/image',
    '@element-plus/nuxt',
    'nuxt-icon'
  ],

  /* 配置跨域代理 */
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE, // 这里是接口地址
        changeOrigin: true,
        prependPath: true
        // rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },

  /* 打包之后的地址 */
  routeRules: {
    '/api/**': {
      proxy: 'http://127.0.0.1:9090/**'
    }
  },

  /* 设置seo */
  app: {
    head: {
      title: '个人博客后台管理系统',
      meta: [
        /* seo搜索引擎关键词 */
        /* { name:'keywords',content:'关键词....'} */
      ],
      link: [{ rel: 'logo icon', href: '/logo.png' }] // 路径是public下的
    }
    /* 动画效果 */
    // pageTransition: { name: 'layout', mode: 'in-out' }
  },

  /* css */
  css: ['~/styles/reset.css', '~/styles/comment.css', '~/styles/main.scss'],

  /* vue-tsc */
  typescript: {
    typeCheck: false,
    shim: false
  },

  /* nuxt/image配置 */
  image: {
    dir: 'assets/images/'
  },

  /* svg配置 */
  svgSprite: {
    input: '~/src/assets/sprite/svg',
    output: '~/src/assets/sprite/gen'
  },
  alias: {
    '~/src/assets/sprite/gen': join(__dirname, 'src/assets/sprite/gen')
  },

  /* 开启指定的地址 */
  devServer: {
    port: 9000,
    host: '0.0.0.0'
  },

  /* 打包去除console.log等，开发者可以尽情写console.log */
  vite: {
    envDir: '~/env', // 指定env文件夹
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace']
    },
    resolve: {
      alias: {
        '~/server': '/src/server' // 让 Vite 当普通目录解析（绕过 Nuxt 限制）
      }
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'pagination'
    }
  },

  elementPlus: {
    imports: ['useLocale'],
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
    injectionID: { prefix: 100, current: 1 }
  }
});
