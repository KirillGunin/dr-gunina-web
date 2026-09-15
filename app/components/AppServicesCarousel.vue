<template>
    <section class="services-carousel">
        <div class="services-carousel__header">
            <h2 class="services-carousel__title">{{ heading }}</h2>
        </div>

        <div class="services-carousel__content">
            <div
                class="services-carousel__preview-card"
                v-show="service.service !== route.params.service"
                v-for="service in services"
                :key="service.service"
            >
                <NuxtLink
                    class="services-carousel__preview-card-image"
                    :to="
                        localePath({
                            name: 'services-service',
                            params: { service: service.service },
                        })
                    "
                >
                    <NuxtImg
                        :src="service.img"
                        :alt="service.title"
                        format="webp"
                        loading="lazy"
                        width="150"
                        height="150"
                        sizes="767:100vw 768:150px"
                    />
                </NuxtLink>

                <NuxtLink
                    class="services-carousel__preview-card-title"
                    :to="
                        localePath({
                            name: 'services-service',
                            params: { service: service.service },
                        })
                    "
                >
                    {{ service.title }}
                </NuxtLink>

                <p class="services-carousel__preview-card-description">
                    {{ service.content }}
                </p>

                <p class="services-carousel__preview-card-price">
                    {{ formatPrice(service.price) }}
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { fetchServices } from '~/api/services';
import { useRoute } from 'vue-router';
import type { Service } from '~/types/service';
import { formatPrice } from '~/utils/formatPrice';

defineProps<{
    heading: string;
}>();

const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const { data: services } = useAsyncData<Service[]>(
    'services-carousel',
    () =>
        fetchServices()
            .then((response) => response.data.data)
            .catch(() => {}),
    { watch: [locale] }
);
</script>
