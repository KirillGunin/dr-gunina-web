import primeiconsFontUrl from 'primeicons/fonts/primeicons.woff2?url';

// primeicons.css is imported via node_modules, so its font file is
// content-hashed at build time — the ?url import resolves to the exact
// same hashed asset, keeping this preload in sync automatically.
export default defineNuxtPlugin(() => {
    useHead({
        link: [
            {
                rel: 'preload',
                as: 'font',
                type: 'font/woff2',
                href: primeiconsFontUrl,
                crossorigin: 'anonymous',
            },
        ],
    });
});
