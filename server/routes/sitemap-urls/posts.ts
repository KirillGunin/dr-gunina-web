import { defineEventHandler } from 'h3';
import type { H3Event } from 'h3';
import type { SitemapUrlInput } from '#sitemap/types';

type PostsPage = {
    data: { slug: string; date: string }[];
    meta: { lastPage: number };
};

export default defineEventHandler(async (event: H3Event): Promise<SitemapUrlInput[]> => {
    const { apiBaseUrl } = useRuntimeConfig(event).public;

    const fetchPage = (page: number) =>
        $fetch<PostsPage>('/api/posts', { baseURL: apiBaseUrl, query: { page } });

    const firstPage = await fetchPage(1);
    const nextPages = await Promise.all(
        Array.from({ length: firstPage.meta.lastPage - 1 }, (_, index) => fetchPage(index + 2))
    );

    return [firstPage, ...nextPages]
        .flatMap((page) => page.data)
        .map(
            (post) =>
                ({
                    loc: `/blog/${post.slug}`,
                    lastmod: post.date,
                    // Статьи есть только на русском — в en/es-sitemap не попадают
                    _sitemap: 'ru',
                }) satisfies SitemapUrlInput
        );
});
