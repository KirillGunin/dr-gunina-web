<template>
    <Card
        class="card-service"
        v-animateonscroll="{
            enterClass: 'zoom-in',
            leaveClass: 'zoom-out',
            threshold: 0,
        }"
        @click="emits('open:service', service)"
    >
        <template #header>
            <NuxtImg
                :src="service.img"
                :alt="service.title"
                format="webp"
                loading="lazy"
                width="360"
                height="471"
                sizes="767:100vw 768:360px"
            />
        </template>

        <template v-if="service.title" #title>
            {{ service.title }}
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
                <AppButton
                    :label="$t('others.details')"
                    size="small"
                    severity="success"
                    raised
                    @click.stop="emits('open:service', service)"
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
import type { Service } from '@/types/service';
import { formatPrice } from '~/utils/formatPrice';

defineProps<{
    service: Service;
}>();

const emits = defineEmits<{
    (event: 'open:service', service: Service): void;
    (event: 'purchase:service', service: Service): void;
}>();
</script>
