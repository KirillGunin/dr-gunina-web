// SEO: Schema.org Review-разметка для отзывов (https://schema.org/Review)
import { useHead } from '#imports';
import type { Ref } from 'vue';
import type { Review } from '@/types/reviews';

const SITE_URL = 'https://dr-gunina.ru';

export function useSeoReviews(reviews: Ref<Review[] | null | undefined>) {
    useHead({
        script: [
            {
                type: 'application/ld+json',
                innerHTML: () => {
                    if (!reviews.value?.length) {
                        return '';
                    }

                    const ratingSum = reviews.value.reduce((sum, review) => sum + review.rating, 0);
                    const ratingAverage = ratingSum / reviews.value.length;

                    return JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'AggregateRating',
                                itemReviewed: {
                                    '@id': `${SITE_URL}/#physician`,
                                },
                                ratingValue: Number(ratingAverage.toFixed(1)),
                                reviewCount: reviews.value.length,
                                bestRating: 5,
                                worstRating: 1,
                            },
                            ...reviews.value.map((review) => ({
                                '@type': 'Review',
                                author: {
                                    '@type': 'Person',
                                    name: `${review.name} ${review.last_name[0]}.`,
                                },
                                reviewBody: review.text,
                                datePublished: review.created_at,
                                reviewRating: {
                                    '@type': 'Rating',
                                    ratingValue: review.rating,
                                    bestRating: 5,
                                    worstRating: 1,
                                },
                                itemReviewed: {
                                    '@id': `${SITE_URL}/#physician`,
                                },
                            })),
                        ],
                    });
                },
            },
        ],
    });
}
