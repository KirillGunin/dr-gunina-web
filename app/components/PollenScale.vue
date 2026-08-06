<template>
    <div class="pollen-scale" role="img" :aria-label="ariaLabel">
        <div class="pollen-scale__track">
            <div
                class="pollen-scale__marker"
                :style="{
                    left: markerPosition,
                    backgroundColor: markerColor,
                    color: markerTextColor,
                }"
            >
                {{ indexInfo.value }}
            </div>
        </div>

        <div class="pollen-scale__caption">
            <div>
                <span
                    class="pollen-scale__category"
                    :style="{ backgroundColor: markerColor, color: markerTextColor }"
                >
                    {{ $t('pages.pollen.pollen-index') }}: {{ indexInfo.category }}
                </span>
            </div>

            <p v-if="indexInfo.indexDescription" class="pollen-scale__description">
                {{ indexInfo.indexDescription }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PollenIndexInfo } from '@/types/pollen';
import { pollenColorToCss, getContrastTextColor } from '~/utils/pollen';

const props = withDefaults(
    defineProps<{
        indexInfo: PollenIndexInfo;
        max?: number;
    }>(),
    {
        max: 5,
    }
);

const ticks = computed(() => Array.from({ length: props.max + 1 }, (_, tick) => tick));

const markerPosition = computed(() => {
    const percent = (props.indexInfo.value / props.max) * 100;

    return `${Math.min(100, Math.max(0, percent))}%`;
});

const markerColor = computed(
    () => pollenColorToCss(props.indexInfo.color) ?? 'var(--p-neutral-300)'
);

const markerTextColor = computed(() => getContrastTextColor(props.indexInfo.color));

const ariaLabel = computed(
    () =>
        `${props.indexInfo.displayName}: ${props.indexInfo.category} (${props.indexInfo.value} из ${props.max})`
);
</script>
