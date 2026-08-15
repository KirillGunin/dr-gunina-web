// SEO: Карта пыльцы /pollen
import { computed, useHead, useI18n, useSeoMeta } from '#imports';

const SITE_URL = 'https://dr-gunina.ru';

const OG_LOCALE_BY_LANG: Record<string, string> = {
    ru: 'ru_RU',
    en: 'en_US',
    es: 'es_ES',
};

export function useSeoPollen() {
    const { locale, t } = useI18n();

    const localePrefix = computed(() => (locale.value === 'ru' ? '' : `/${locale.value}`));
    const canonicalUrl = computed(() => `${SITE_URL}${localePrefix.value}/pollen`);

    useSeoMeta({
        title: () => t('pages.pollen.seo-title'),
        description: () => t('pages.pollen.seo-description'),

        ogTitle: () => t('pages.pollen.seo-title'),
        ogDescription: () => t('pages.pollen.seo-description'),
        ogType: 'website',
        ogUrl: canonicalUrl,
        ogLocale: () => OG_LOCALE_BY_LANG[locale.value] ?? 'ru_RU',
        ogLocaleAlternate: () =>
            Object.entries(OG_LOCALE_BY_LANG)
                .filter(([lang]) => lang !== locale.value)
                .map(([, ogLocale]) => ogLocale),
        twitterCard: 'summary_large_image',
        twitterTitle: () => t('pages.pollen.seo-title'),
        twitterDescription: () => t('pages.pollen.seo-description'),
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    useHead({
        link: [
            { rel: 'canonical', href: canonicalUrl },
            { rel: 'alternate', hreflang: 'ru', href: `${SITE_URL}/pollen` },
            { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/en/pollen` },
            { rel: 'alternate', hreflang: 'es', href: `${SITE_URL}/es/pollen` },
            { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/pollen` },
        ],
    });
}
