<template>
    <Card
        class="card-service"
        v-animateonscroll="{
            enterClass: 'zoom-in',
            leaveClass: 'zoom-out',
            threshold: 0.1,
        }"
    >
        <template #header>
            <img :src="service.img" :alt="service.title" />
        </template>

        <template v-if="service.title" #title>
            {{ service.title }}
        </template>

        <template v-if="service.content" #content>
            <p>{{ service.content }}</p>
            <p class="card-service__price">{{ service.price }}</p>
        </template>

        <template #footer>
            <div class="card-service__controls">
                <AppButton
                    label="Подробнее"
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
                />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { Service } from '~/types/service';

defineProps<{
    service: Service;
}>();

const emits = defineEmits<{
    (event: 'open:info-modal', service: Service): void;
    (event: 'purchase', service: Service): void;
}>();
</script>
