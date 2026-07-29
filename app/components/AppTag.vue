<template>
    <div class="tag" :class="computedClasses">
        <p>{{ name }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Tag } from '~/types/tag';

const props = defineProps<Tag>();

const computedClasses = computed(() => {
    return [
        props.color && `tag--${props.color}`,
        props.size && `tag--${props.size}`,
        props.raised && 'tag--raised',
    ];
});
</script>
