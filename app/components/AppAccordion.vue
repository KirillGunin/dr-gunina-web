<template>
    <div class="accordion">
        <div class="accordion__header" @click="isOpen = !isOpen">
            <span class="accordion__header-label">{{ label }}</span>
            <SvgIcon
                class="accordion__header-icon"
                :class="{ 'accordion__header-icon--active': isOpen }"
                name="chevron"
            />
        </div>

        <div ref="contentRef" class="accordion__content" :style="{ maxHeight: contentHeight }">
            <div ref="innerRef" class="accordion__inner">
                <div v-for="item in items" :key="item.title">
                    <a v-if="item.link" :href="item.link" target="_blank" class="accordion__title">
                        <SvgIcon class="accordion__icon" name="circle" />
                        {{ item.title }}
                    </a>
                    <span v-else class="accordion__title">
                        <SvgIcon class="accordion__icon" name="circle" />
                        {{ item.title }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

defineProps<{
    label: string;
    items: any;
}>();

const isOpen = ref(false);
const innerRef = ref<HTMLElement | null>(null);

const contentHeight = computed(() => {
    if (!isOpen.value) return '0px';
    return (innerRef.value?.offsetHeight ?? 0) + 'px';
});
</script>
