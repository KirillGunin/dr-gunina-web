<template>
    <AppModal
        class="modal-cookie"
        width="24rem"
        :header="$t('cookie.modal-header')"
        :visible="visible"
        :dismissable-mask="false"
        :pt="{
            header: {
                style: {
                    padding: '0 0 var(--spacer-xs)',
                },
            },
            content: {
                style: {
                    padding: '0',
                    overflow: 'scroll',
                    flexGrow: '0',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE
                },
            },
            root: {
                style: {
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    padding: '8px 8px 20px 20px',
                },
            },
        }"
        @close:visible="emits('set:agreement', 'decline')"
    >
        <div class="modal-cookie__content">
            <span class="modal-cookie__content-text">{{ $t('cookie.modal-content') }}</span>

            <AppButton
                size="small"
                :label="$t('cookie.accept')"
                :severity="'success'"
                @click="emits('set:agreement', 'accept')"
            />
        </div>
    </AppModal>
</template>

<script setup lang="ts">
defineProps<{
    visible: boolean;
}>();

const emits = defineEmits<{
    (event: 'set:agreement', value: 'accept' | 'decline'): void;
}>();
</script>
