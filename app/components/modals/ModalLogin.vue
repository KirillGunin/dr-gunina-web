<template>
    <AppModal
        class="modal-login"
        width="26rem"
        :header="$t('forms.login.header')"
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
        <FormLogin @success:login="onLoginSuccess" />
    </AppModal>
</template>

<script setup lang="ts">
import FormLogin from '~/components/forms/FormLogin.vue';

defineProps<{
    visible: boolean;
}>();

const emits = defineEmits<{
    (event: 'close:visible'): void;
}>();

const onLoginSuccess = () => {
    navigateTo('/admin');
};
</script>
