<template>
    <AppModal
        class="modal-service"
        width="60rem"
        :header="service.title"
        :visible="visible"
        :pt="{
            root: {
                style: {
                    justifyContent: 'flex-start',
                },
            },
            header: {
                style: {
                    padding: '0 var(--spacer-xs) var(--spacer-md)',
                },
            },
            content: {
                style: {
                    padding: '0 var(--spacer-xs) var(--spacer-xs)',
                    overflow: 'scroll',
                    flexGrow: '0',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE
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
                    severity="success"
                    variant="outlined"
                    :label="service.modalActionButton"
                    @click="emits('select:action', service)"
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
    (event: 'select:action', service: Service): void;
}>();
</script>
