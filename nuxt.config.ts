import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxtjs/mdc', 'nuxt-mapbox'],
    css: ['~/assets/css/main.css'],
    ui: {
        // disable automatic switch between light and dark mode
        colorMode: false
    },
    image: {
        provider: 'cloudflare',
        cloudflare: {
            baseURL: 'https://imagedelivery.net/08WjJu0y_NwzY_GFS74XCw',
        },
    },
    mdc: {
        components: {
            prose: false, // Disable predefined prose components
        }
    },
    app: {
        head: {
            title: 'Schliere lacht: 3. bis 12. September 2027',
            htmlAttrs: {
                lang: 'de',
            },
            link: [
                {rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96'},
                {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', sizes: '96x96'},
                {rel: 'shortcut icon', href: '/favicon.ico'},
                {rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180'},
                {rel: 'manifest', href: '/site.webmanifest'},
            ],
        }
    },
    runtimeConfig: {
        public: {
            version: pkg.version,
            apiBaseUrl: 'https://api.schlierelacht.ch'
        }
    },
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ]
        }
    },
    mapbox: {
        accessToken: process.env.NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
    }
})
