<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>

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
useHead({
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
</script>
