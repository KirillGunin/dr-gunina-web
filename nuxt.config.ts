// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    vite: {
        resolve: {
            alias: {
                '@': './app',
            },
        },
    },
    devServer: {
        port: 3000,
    },
    modules: ['@primevue/nuxt-module', 'nuxt-svg-sprite-icon', '@nuxtjs/i18n'],
    i18n: {
        defaultLocale: 'ru',
        locales: [
            { code: 'ru', name: 'Русский', file: 'ru.json' },
            { code: 'es', name: 'Español', file: 'es.json' },
            { code: 'en', name: 'English', file: 'en.json' },
        ],
    },
    css: ['~/assets/css/main.scss'],
    primevue: {
        importTheme: { from: '@/themes/theme.ts' },
    },
    typescript: {
        typeCheck: true,
    },
});
