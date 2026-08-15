<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>

        <ModalCookie :visible="modalCookie" @set:agreement="setCookieAgreement" />

        <Toast
            :pt="{
                closeButton: {
                    style: {
                        outline: 'none',
                        boxShadow: 'none',
                        background: 'transparent',
                    },
                },
            }"
        />
    </div>
</template>
<script setup lang="ts">
import { useCookieAgreement } from '~/composables/useCookieAgreement';
import ModalCookie from '~/components/modals/ModalCookie.vue';

const { agreement, setAgreement } = useCookieAgreement();
const modalCookie = ref<boolean>(false);
const { locale } = useI18n();

const setCookieAgreement = (value: 'accept' | 'decline') => {
    setAgreement(value);
    modalCookie.value = false;
};

useHead({
    htmlAttrs: { lang: () => locale.value },

    script: [
        {
            innerHTML: `
                const theme = document.cookie.match(/theme=([^;]+)/)?.[1];
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark-mode');
                }
            `,
            tagPosition: 'head',
        },
    ],
});

onBeforeMount(() => {
    if (!agreement.value) {
        modalCookie.value = true;
    }
});
</script>
