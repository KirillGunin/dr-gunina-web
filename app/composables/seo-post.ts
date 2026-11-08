// SEO: Страница поста блога /blog/:post
import { computed, useHead, useI18n, useSeoMeta } from '#imports';
import type { Ref } from 'vue';
import type { Post } from '@/types/posts';

const SITE_URL = 'https://dr-gunina.ru';
const DESCRIPTION_LENGTH = 160;

export function useSeoPost(post: Ref<Post | null | undefined>) {
    const { t } = useI18n();
    const route = useRoute();
    const physicianName = t('others.name');

    // Статьи есть только на русском — /en и /es версии канонизируются на русскую
    const canonicalUrl = computed(() => `${SITE_URL}/blog/${route.params.post}`);

    const seoTitle = computed(() => post.value?.title ?? t('pages.blog.title'));
    const seoDescription = computed(() => {
        const text = (post.value?.subtitle || post.value?.text || '').replace(/\s+/g, ' ').trim();

        return text.length > DESCRIPTION_LENGTH
            ? `${text.slice(0, DESCRIPTION_LENGTH).trim()}…`
            : text;
    });
    const imageUrl = computed(() => post.value?.media?.[0]?.url ?? `${SITE_URL}/images/main.png`);

    useSeoMeta({
        title: seoTitle,
        description: seoDescription,

        ogTitle: seoTitle,
        ogDescription: seoDescription,
        ogType: 'article',
        ogUrl: canonicalUrl,
        ogImage: imageUrl,
        ogLocale: 'ru_RU',
        articlePublishedTime: () => post.value?.date,
        twitterCard: 'summary_large_image',
        twitterTitle: seoTitle,
        twitterDescription: seoDescription,
        robots: () =>
            post.value
                ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
                : 'noindex, nofollow',
    });

    useHead({
        link: [
            { rel: 'canonical', href: canonicalUrl },
            { rel: 'alternate', hreflang: 'ru', href: canonicalUrl },
            { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
        ],

        script: [
            {
                type: 'application/ld+json',
                innerHTML: () => {
                    if (!post.value) {
                        return '';
                    }

                    return JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'BlogPosting',
                                '@id': `${canonicalUrl.value}#post`,
                                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl.value },
                                headline: seoTitle.value,
                                description: seoDescription.value,
                                image: imageUrl.value,
                                datePublished: post.value.date,
                                dateModified: post.value.date,
                                inLanguage: 'ru',
                                url: canonicalUrl.value,
                                isPartOf: { '@id': `${SITE_URL}/#blog` },
                                // Google для Article/BlogPosting требует у author name,
                                // а у publisher — name и logo, ссылки по одному @id недостаточно
                                author: {
                                    '@type': 'Person',
                                    '@id': `${SITE_URL}/#physician`,
                                    name: physicianName,
                                },
                                publisher: {
                                    '@type': 'Physician',
                                    '@id': `${SITE_URL}/#physician`,
                                    name: physicianName,
                                    logo: {
                                        '@type': 'ImageObject',
                                        url: `${SITE_URL}/images/main.png`,
                                    },
                                },
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
                                        item: `${SITE_URL}/blog`,
                                    },
                                    {
                                        '@type': 'ListItem',
                                        position: 3,
                                        name: seoTitle.value,
                                        item: canonicalUrl.value,
                                    },
                                ],
                            },
                        ],
                    });
                },
            },
        ],
    });
}
