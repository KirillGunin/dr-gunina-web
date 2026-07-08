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
            <img :src="service.img" :alt="service.title" />

            <span class="card-service__icon card-service__icon--details">
                <i class="pi pi-ellipsis-v" @click="emits('open:info-modal', service)"></i>
            </span>
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

                <span class="card-service__icon">
                    <i class="pi pi-shopping-bag" @click="service.command"></i>
                </span>
            </p>
        </template>

        <template #footer>
            <div class="card-service__controls">
                <AppButton
                    :label="$t('others.details')"
                    size="small"
                    severity="success"
                    raised
                    @click="emits('open:info-modal', service)"
                />

                <AppButton
                    size="small"
                    severity="success"
                    variant="outlined"
                    raised
                    :label="service.actionTitle"
                    @click="service.command"
                />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { Service } from '@/types/service';

defineProps<{
    service: Service;
}>();

const emits = defineEmits<{
    (event: 'open:info-modal', service: Service): void;
    (event: 'purchase', service: Service): void;
}>();
</script>
