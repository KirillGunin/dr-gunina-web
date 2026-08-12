<template>
    <Card
        class="card-service"
        v-animateonscroll="{
            enterClass: 'zoom-in',
            leaveClass: 'zoom-out',
            threshold: 0,
        }"
    >
        <template #header>
            <NuxtLink :to="navigateToPath">
                <NuxtImg
                    :src="service.img"
                    :alt="service.title"
                    format="webp"
                    loading="lazy"
                    width="360"
                    height="471"
                    sizes="767:100vw 768:360px"
                />
            </NuxtLink>
        </template>

        <template v-if="service.title" #title>
            <NuxtLink :to="navigateToPath">{{ service.title }}</NuxtLink>
        </template>

        <template v-if="service.content" #content>
            <p class="card-service__description">{{ service.content }}</p>

            <div class="card-service__tags">
                <AppTag
                    v-for="tag in service.tags"
                    :key="tag.name"
                    :name="tag.name"
                    :color="tag.color"
                    size="xs"
                />
            </div>

            <p class="card-service__price">
                {{ formatPrice(service.price) }}
            </p>
        </template>

        <template #footer>
            <div class="card-service__controls">
                <AppButtonLink
                    :label="$t('others.details')"
                    size="small"
                    severity="success"
                    raised
                    :to="navigateToPath"
                />

                <AppButton
                    size="small"
                    severity="success"
                    variant="outlined"
                    raised
                    :label="service.actionTitle"
                    @click.stop="emits('purchase:service', service)"
                />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Service } from '@/types/service';
import { formatPrice } from '~/utils/formatPrice';

const props = defineProps<{
    service: Service;
}>();

const emits = defineEmits<{
    (event: 'purchase:service', service: Service): void;
}>();

const localePath = useLocalePath();
const navigateToPath = computed(() =>
    localePath({ name: 'services-service', params: { service: props.service.service } })
);
</script>
