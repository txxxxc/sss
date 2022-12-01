import path from 'path'

export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  typescript: {
    shim: false,
  },
  components: [
    {
      path: '@/components/',
      pathPrefix: false,
    },
  ],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  srcDir: 'src/',
  build: {
    transpile: ['vuetify'],
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
