<template>
    <div class="speed-dial">
        <SpeedDial
            mask
            :model="items"
            :radius="120"
            type="quarter-circle"
            direction="down-left"
            :buttonProps="{ severity: 'contrast', rounded: true }"
            @show="isMenuOpen = true"
            @hide="isMenuOpen = false"
        >
            <template #item="{ item, toggleCallback }">
                <div class="speed-dial__item" @click="toggleCallback">
                    <SvgIcon v-if="item.icon" :name="item.icon" />
                </div>
            </template>
        </SpeedDial>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '#imports';

import type { SpeedDialItem } from '~/types/speedDialItem';

const { setLocale } = useI18n();
const isMenuOpen = ref<boolean>(false);
const isDarkMode = ref<boolean>(false);

const items = computed<SpeedDialItem[]>(() => [
    {
        icon: 'mail',
        command: () => {
            console.log(1);
        },
    },
    {
        icon: 'telegram',
        command: () => {
            console.log(2);
        },
    },
    {
        icon: isDarkMode.value ? 'lamp-on' : 'lamp-off',
        command: () => {
            isDarkMode.value = !isDarkMode.value;
            document.documentElement.classList.toggle('dark-mode');
        },
    },
    {
        icon: 'ru',
        command: () => {
            setLocale('ru');
        },
    },
    {
        icon: 'en',
        command: () => {
            setLocale('en');
        },
    },
    {
        icon: 'es',
        command: () => {
            setLocale('es');
        },
    },
]);
</script>
