// SEO: Страница услуги /services/:service
import { computed, useHead, useSeoMeta } from '#imports';
import type { Ref } from 'vue';
import type { Service } from '@/types/service';

const SITE_URL = 'https://dr-gunina.ru';

const OG_LOCALE_BY_LANG: Record<string, string> = {
    ru: 'ru_RU',
    en: 'en_US',
    es: 'es_ES',
};

export function useSeoService(service: Ref<Service | null | undefined>) {
    const { locale, t } = useI18n();
    const route = useRoute();
    const physicianName = t('others.name');

    const path = computed(() => `/services/${route.params.service}`);
    const localePrefix = computed(() => (locale.value === 'ru' ? '' : `/${locale.value}`));
    const canonicalUrl = computed(() => `${SITE_URL}${localePrefix.value}${path.value}`);

    const imageUrl = computed(() => {
        const img = service.value?.img;

        if (!img) {
            return `${SITE_URL}/images/main.png`;
        }

        return img.startsWith('http') ? img : `${SITE_URL}${img}`;
    });

    useSeoMeta({
        title: () => service.value?.title,
        description: () => service.value?.content,
        ogTitle: () => service.value?.title,
        ogDescription: () => service.value?.content,
        ogType: 'website',
        ogUrl: canonicalUrl,
        ogImage: imageUrl,
        ogLocale: () => OG_LOCALE_BY_LANG[locale.value] ?? 'ru_RU',
        twitterCard: 'summary_large_image',
        twitterTitle: () => service.value?.title,
        twitterDescription: () => service.value?.content,
        robots: () =>
            service.value
                ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
                : 'noindex, nofollow',
    });

    useHead({
        link: [
            { rel: 'canonical', href: canonicalUrl },
            { rel: 'alternate', hreflang: 'ru', href: () => `${SITE_URL}${path.value}` },
            { rel: 'alternate', hreflang: 'en', href: () => `${SITE_URL}/en${path.value}` },
            { rel: 'alternate', hreflang: 'es', href: () => `${SITE_URL}/es${path.value}` },
            { rel: 'alternate', hreflang: 'x-default', href: () => `${SITE_URL}${path.value}` },
        ],

        script: [
            {
                type: 'application/ld+json',
                innerHTML: () => {
                    if (!service.value) {
                        return '';
                    }

                    return JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: service.value.title,
                        description: service.value.content,
                        url: canonicalUrl.value,
                        image: imageUrl.value,
                        inLanguage: locale.value,
                        provider: {
                            '@type': 'Physician',
                            '@id': `${SITE_URL}/#physician`,
                            name: physicianName,
                        },
                        offers: {
                            '@type': 'Offer',
                            price: service.value.price,
                            priceCurrency: 'RUB',
                            availability: 'https://schema.org/InStock',
                            url: canonicalUrl.value,
                        },
                    });
                },
            },
        ],
    });
}
