import { defineEventHandler } from 'h3';
import type { H3Event } from 'h3';
import type { SitemapUrlInput } from '#sitemap/types';

type ServiceSlug = { service: string };

export default defineEventHandler(async (event: H3Event): Promise<SitemapUrlInput[]> => {
    const { apiBaseUrl } = useRuntimeConfig(event).public;

    const services = await $fetch<{ data: ServiceSlug[] }>('/api/services', {
        baseURL: apiBaseUrl,
    }).then((response) => response.data);

    return services.map(
        (service) =>
            ({
                loc: `/services/${service.service}`,
                _i18nTransform: true,
            }) satisfies SitemapUrlInput
    );
});
