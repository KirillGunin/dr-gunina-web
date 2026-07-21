<template>
    <AppModal
        class="modal-review"
        width="34rem"
        :header="$t('forms.review.header')"
        :visible="visible"
        :pt="{
            header: {
                style: {
                    padding: '0 0 var(--spacer-md) var(--spacer-xs)',
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
        <FormReview @success:review="(response) => emits('success:review', response)" />
    </AppModal>
</template>

<script setup lang="ts">
import FormReview from '@/components/forms/FormReview.vue';
import type { AxiosResponse } from 'axios';

type ServiceProps = {
    visible: boolean;
};

withDefaults(defineProps<ServiceProps>(), {
    visible: false,
});

const emits = defineEmits<{
    (event: 'close:visible'): void;
    (event: 'success:review', response: AxiosResponse): void;
}>();
</script>
