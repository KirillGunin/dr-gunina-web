// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    experimental: {
        // Без этого composable-вызовы (navigateTo, useRequestEvent и т.п.),
        // выполняющиеся после await реального сетевого запроса (axios),
        // теряют Nuxt SSR-контекст — unctx не использует AsyncLocalStorage.
        asyncContext: true,
    },
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
        '@pinia/nuxt',
    ],
    image: {
        format: ['webp'],
        quality: 80,
        domains: [new URL(process.env.NUXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000').host],
    },
    site: {
        url: 'https://dr-gunina.ru',
        name: 'Гунина Ксения Александровна — педиатр, аллерголог-имунолог, дерматолог',
    },
    sitemap: {
        sources: ['/sitemap-urls/services'],
        exclude: ['/admin', '/admin/**', '/privacy', '/en/privacy', '/es/privacy'],
    },
    routeRules: {
        '/api/**': { proxy: `${process.env.NUXT_PUBLIC_API_BASE_URL}/api/**` },
        '/admin': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
        '/admin/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    },
    // nitro: {
    //     prerender: {
    //         routes: [
    //             '/_ipx/f_webp&q_80&s_650x650/images/main.png',
    //             '/_ipx/f_webp&q_80&s_767x767/images/main.png',
    //             '/_ipx/f_webp&q_80&s_1300x1300/images/main.png',
    //             '/_ipx/f_webp&q_80&s_1534x1534/images/main.png',
    //             '/_ipx/f_webp&q_80&s_600x600/images/about.png',
    //             '/_ipx/f_webp&q_80&s_1200x1200/images/about.png',
    //             ...['consultation', 'lure', 'chat-group', 'individual-chat', 'vaccination'].flatMap(
    //                 (name) => [
    //                     `/_ipx/f_webp&q_80&s_360x471/images/services/${name}.png`,
    //                     `/_ipx/f_webp&q_80&s_720x942/images/services/${name}.png`,
    //                     `/_ipx/f_webp&q_80&s_767x1003/images/services/${name}.png`,
    //                     `/_ipx/f_webp&q_80&s_1534x2006/images/services/${name}.png`,
    //                 ]
    //             ),
    //         ],
    //     },
    // },
    i18n: {
        defaultLocale: 'ru',
        detectBrowserLanguage: false,
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
                {
                    rel: 'preload',
                    as: 'font',
                    type: 'font/woff2',
                    href: '/fonts/Inter-Regular.woff2',
                    crossorigin: 'anonymous',
                },
                {
                    rel: 'preload',
                    as: 'font',
                    type: 'font/woff2',
                    href: '/fonts/Inter-Medium.woff2',
                    crossorigin: 'anonymous',
                },
                {
                    rel: 'preload',
                    as: 'font',
                    type: 'font/woff2',
                    href: '/fonts/Inter-SemiBold.woff2',
                    crossorigin: 'anonymous',
                },
                {
                    rel: 'preload',
                    as: 'font',
                    type: 'font/otf',
                    href: '/fonts/Glina.otf',
                    crossorigin: 'anonymous',
                },
            ],
            noscript: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID
                ? [
                      {
                          innerHTML: `<div><img src="https://mc.yandex.ru/watch/${process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`,
                      },
                  ]
                : [],
        },
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
            yandexMapsApiKey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
            yandexMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID,
        },
    },
});
