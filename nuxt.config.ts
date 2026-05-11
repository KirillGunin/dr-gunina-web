// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    vite: {
        resolve: {
            alias: {
                '@': resolve(__dirname, './app'),
            },
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
    modules: ['@primevue/nuxt-module', 'nuxt-svg-sprite-icon', '@nuxtjs/i18n', '@vueuse/nuxt'],
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
            script: [
                {
                    src: `https://api-maps.yandex.ru/v3/?apikey=${process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`,
                    defer: true,
                },
            ],
        },
    },
});
