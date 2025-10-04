// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: [],
  imports: {
    autoImport: true,
    dirs: [
      'composables',
      'composables/**',
      'app/composables',
      'app/composables/**'
    ]
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      prefix: 'Ui'
    }
  ],
  typescript: {
    strict: false,
    typeCheck: false
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NODE_ENV === 'production' ?
          process.env.NUXT_PUBLIC_API_BASE || "https://api.madewithpassion.io/api/v1"
          : "http://task-runner.fr/api/v1"
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/auth/callback/google',
        '/auth/callback/github'
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
