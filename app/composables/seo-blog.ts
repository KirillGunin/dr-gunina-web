// SEO: Страница блога /blog
import { computed, useHead, useI18n, useSeoMeta } from '#imports';

const SITE_URL = 'https://dr-gunina.ru';

const OG_LOCALE_BY_LANG: Record<string, string> = {
    ru: 'ru_RU',
    en: 'en_US',
    es: 'es_ES',
};

export function useSeoBlog() {
    const { locale, t } = useI18n();
    const physicianName = t('others.name');

    const localePrefix = computed(() => (locale.value === 'ru' ? '' : `/${locale.value}`));
    const canonicalUrl = computed(() => `${SITE_URL}${localePrefix.value}/blog`);

    useSeoMeta({
        title: () => t('pages.blog.seo-title'),
        description: () => t('pages.blog.seo-description'),

        ogTitle: () => t('pages.blog.seo-title'),
        ogDescription: () => t('pages.blog.seo-description'),
        ogType: 'website',
        ogUrl: canonicalUrl,
        ogLocale: () => OG_LOCALE_BY_LANG[locale.value] ?? 'ru_RU',
        ogLocaleAlternate: () =>
            Object.entries(OG_LOCALE_BY_LANG)
                .filter(([lang]) => lang !== locale.value)
                .map(([, ogLocale]) => ogLocale),
        twitterCard: 'summary_large_image',
        twitterTitle: () => t('pages.blog.seo-title'),
        twitterDescription: () => t('pages.blog.seo-description'),
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    useHead({
        link: [
            { rel: 'canonical', href: canonicalUrl },
            { rel: 'alternate', hreflang: 'ru', href: `${SITE_URL}/blog` },
            { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/en/blog` },
            { rel: 'alternate', hreflang: 'es', href: `${SITE_URL}/es/blog` },
            { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/blog` },
        ],

        script: [
            {
                type: 'application/ld+json',
                innerHTML: () =>
                    JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'Blog',
                                '@id': `${SITE_URL}/#blog`,
                                url: canonicalUrl.value,
                                name: t('pages.blog.seo-title'),
                                description: t('pages.blog.seo-description'),
                                inLanguage: locale.value,
                                publisher: { '@id': `${SITE_URL}/#physician` },
                                author: { '@id': `${SITE_URL}/#physician` },
                            },
                            {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    {
                                        '@type': 'ListItem',
                                        position: 1,
                                        name: physicianName,
                                        item: SITE_URL,
                                    },
                                    {
                                        '@type': 'ListItem',
                                        position: 2,
                                        name: t('pages.blog.title'),
                                        item: canonicalUrl.value,
                                    },
                                ],
                            },
                        ],
                    }),
            },
        ],
    });
}
