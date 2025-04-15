// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  css: ['~/assets/css/main.css'],



  nitro: {
    experimental: {
      tasks: true,
      database: true,
    },
    alias: {
      "~types": "./types/"
    },
    devProxy: {
      host: '127.0.0.1',
    },
  },


  runtimeConfig: {
    oauth:{
      
      github: {

      }
    }
  },

  alias: {
    "~types": "./types/"
  },
  

  modules: [
    '@vueuse/motion/nuxt',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils',
    'nuxt-auth-utils'
  ]
})