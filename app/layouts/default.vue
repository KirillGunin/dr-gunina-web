<template>
    <div>
        <AppHeader />

        <slot />

        <AppFooter v-if="!isLegalPage" />
    </div>
</template>
<script setup lang="ts">
import { useRoute } from '#vue-router';

const route = useRoute();
const isLegalPage = computed(() => route.path === '/privacy');
</script>
