// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    vite: {
        resolve: {
            alias: {
                '@': resolve(__dirname, './app'),
                // inputmask's default entry (dist/inputmask.js) is a legacy
                // webpack/babel bundle with baked-in ES5 transforms and
                // polyfills (Object.entries, String.prototype.includes, etc).
                // Point to the untranspiled ESM source instead — modern
                // browsers don't need any of that. Types still resolve via
                // @types/inputmask since the import specifier stays 'inputmask'.
                inputmask: resolve(__dirname, './node_modules/inputmask/lib/inputmask.js'),
            },
        },
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                '@vuelidate/core',
                '@vuelidate/validators',
                'inputmask',
            ],
        },
        // server: {
        //     headers: {
        //         'Cache-Control': 'no-store',
        //     },
        // },
    },
    devServer: {
        port: 3000,
    },
    modules: [
        '@primevue/nuxt-module',
        'nuxt-svg-sprite-icon',
        '@nuxtjs/i18n',
        '@vueuse/nuxt',
        '@nuxtjs/sitemap',
        '@nuxt/image',
    ],
    image: {
        format: ['webp'],
        quality: 80,
    },
    i18n: {
        defaultLocale: 'ru',
        locales: [
            { code: 'ru', name: 'Русский', file: 'ru.json' },
            { code: 'es', name: 'Español', file: 'es.json' },
            { code: 'en', name: 'English', file: 'en.json' },
        ],
    },
    postcss: {
        plugins: {
            'postcss-custom-media': {},
        },
    },
    css: ['~/assets/css/main.scss'],
    primevue: {
        importTheme: { from: '@/themes/theme.ts' },
    },
    typescript: {
        typeCheck: true,
    },
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            ],
        },
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
            yandexMapsApiKey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
        },
    },
});
