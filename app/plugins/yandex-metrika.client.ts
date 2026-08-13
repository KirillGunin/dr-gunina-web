import type { YandexMetrikaFn } from '~/types/yandex-metrika';

function injectCounterScript(src: string) {
    if (window.ym) {
        return;
    }

    const ym = ((...args: unknown[]) => {
        (ym.a = ym.a || []).push(args);
    }) as YandexMetrikaFn;
    ym.l = Date.now();
    window.ym = ym;

    for (const script of Array.from(document.scripts)) {
        if (script.src === src) {
            return;
        }
    }

    const script = document.createElement('script');
    const firstScript = document.getElementsByTagName('script')[0];
    script.async = true;
    script.src = src;

    if (firstScript) {
        firstScript.parentNode?.insertBefore(script, firstScript);
    }
}

export default defineNuxtPlugin(() => {
    const { yandexMetrikaId } = useRuntimeConfig().public;

    if (!yandexMetrikaId) {
        return;
    }

    const counterId = Number(yandexMetrikaId);

    injectCounterScript(`https://mc.yandex.ru/metrika/tag.js?id=${counterId}`);

    window.ym?.(counterId, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: 'dataLayer',
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true,
    });

    // Базовый сниппет Метрики шлёт хит только на первую загрузку страницы.
    // Клиентские переходы Nuxt-роутера (SPA-навигация) нужно отправлять вручную.
    const router = useRouter();
    router.afterEach((to, from) => {
        window.ym?.(counterId, 'hit', to.fullPath, {
            referer: from.fullPath,
        });
    });
});
