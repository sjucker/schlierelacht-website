// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui'],
    css: ['~/assets/css/main.css'],
    ui: {
        // disable automatic switch between light and dark mode
        colorMode: false
    },
    image: {

    }
})
