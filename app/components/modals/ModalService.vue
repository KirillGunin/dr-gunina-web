<template>
    <AppModal
        class="modal-service"
        width="70rem"
        :visible="visible"
        :pt="{
            header: {
                style: {
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '0',
                    justifyContent: 'flex-end',
                },
            },
            content: {
                style: {
                    padding: 'var(--spacer-xl)',
                },
            },
        }"
        @close:visible="emits('close:visible')"
    >
        <div class="modal-service__container">
            <div class="modal-service__image">
                <img :src="service.img" :alt="service.title" />
            </div>

            <div class="modal-service__content">
                <h5 class="modal-service__title">{{ service.title }}</h5>

                <span class="modal-service__price">{{ formatPrice(service.price) }}</span>

                <ul class="modal-service__details">
                    <li
                        class="modal-service__detail"
                        v-for="detail in service?.details"
                        :key="detail"
                    >
                        <SvgIcon name="circle" />
                        {{ detail }}
                    </li>

                    <li
                        v-if="service.attachment !== null"
                        class="modal-service__detail modal-service__detail--link"
                    >
                        <SvgIcon name="circle" />
                        <a :href="service.attachment.link" :download="service.attachment.title">
                            {{ service.attachment.title }}
                        </a>
                    </li>
                </ul>

                <LazyAppButton
                    rounded
                    raised
                    severity="contrast"
                    :label="service.modalActionButton"
                />
            </div>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
import type { Service } from '@/types/service';

type ServiceProps = {
    visible: boolean;
    service: Service;
};

withDefaults(defineProps<ServiceProps>(), {
    visible: false,
});

const emits = defineEmits<{
    (event: 'close:visible'): void;
}>();
</script>
