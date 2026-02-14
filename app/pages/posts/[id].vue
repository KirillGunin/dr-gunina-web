<template>
    <div>
        post {{ route.params.id }}
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>