<template>
    <component :is="`h${level}`" class="heading" :class="computedClasses">
        <slot />

        <p v-if="subheading" class="subheading">{{ subheading }}</p>
    </component>
</template>

<script setup lang="ts">
export type HeadingSize = 'xs' | 'sm' | 'lg' | 'xl';
export type HeaderLevel = '1' | '2' | '3' | '4' | '5' | '6';

const props = defineProps<{
    level: HeaderLevel;
    size: HeadingSize;
    subheading?: string;
}>();

const computedClasses = computed(() => {
    return [props.size && `heading--${props.size}`];
});
</script>
