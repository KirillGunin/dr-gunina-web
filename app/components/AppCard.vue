<template>
    <Card :pt="pt">
        <template v-if="title" #title>{{ title }}</template>
        <template v-if="subtitle" #subtitle>{{ subtitle }}</template>

        <template v-if="$slots" #content>
            <slot />
        </template>
    </Card>
</template>

<script setup lang="ts">
defineProps<{
    title?: string;
    subtitle?: string;
    maxWidth?: string;
    pt?: object;
}>();
</script>
