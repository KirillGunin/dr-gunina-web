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
import { useTheme } from '~/composables/useTheme';
import type { SpeedDialItem } from '~/types/speedDialItem';

const { setLocale } = useI18n();
const { isDarkMode, toggleMode } = useTheme();

const isMenuOpen = ref<boolean>(false);

const items = computed<SpeedDialItem[]>(() => [
    {
        icon: 'mail',
        command: () => {
            window.open(
                'mailto:dr.kseniagunina@yandex.ru?subject=Письмо с сайта&body=Здравствуйте, Ксения Александровна!%0D%0A%0D%0AХочу уточнить по поводу ',
                '_blank',
                'noopener noreferrer'
            );
        },
    },
    {
        icon: 'telegram',
        command: () => {
            window.open('https://t.me/dr_ksgunina', '_blank', 'noopener noreferrer');
        },
    },
    {
        icon: isDarkMode.value ? 'lamp-on' : 'lamp-off',
        command: () => {
            toggleMode();
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
