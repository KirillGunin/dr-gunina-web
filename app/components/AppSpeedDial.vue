<template>
    <div class="speed-dial">
        <SpeedDial
            mask
            :model="items"
            :radius="120"
            type="quarter-circle"
            direction="down-left"
            :buttonProps="{ severity: 'contrast', rounded: true }"
            :ariaLabel="t('header.menu-toggle')"
            @show="isMenuOpen = true"
            @hide="isMenuOpen = false"
        >
            <template #item="{ item, toggleCallback }">
                <div
                    class="speed-dial__item"
                    role="menuitem"
                    tabindex="0"
                    :aria-label="(item as SpeedDialItem).label"
                    @click="toggleCallback"
                >
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
import { buildMailto } from '~/utils/buildMailto';
import type { SpeedDialItem } from '~/types/speedDialItem';

const { t, setLocale } = useI18n();
const { isDarkMode, toggleMode } = useTheme();

const isMenuOpen = ref<boolean>(false);

const items = computed<SpeedDialItem[]>(() => [
    {
        icon: 'mail',
        label: t('header.email-link'),
        command: () => {
            window.open(
                buildMailto(
                    'dr.kseniagunina@yandex.ru',
                    t('header.email-subject'),
                    t('header.email-body')
                ),
                '_blank',
                'noopener noreferrer'
            );
        },
    },
    {
        icon: 'telegram',
        label: t('header.telegram-link'),
        command: () => {
            window.open('https://t.me/dr_ksgunina', '_blank', 'noopener noreferrer');
        },
    },
    {
        icon: isDarkMode.value ? 'lamp-on' : 'lamp-off',
        label: isDarkMode.value ? t('header.theme-toggle-light') : t('header.theme-toggle-dark'),
        command: () => {
            toggleMode();
        },
    },
    {
        icon: 'ru',
        label: t('header.ru'),
        command: () => {
            setLocale('ru');
        },
    },
    {
        icon: 'en',
        label: t('header.en'),
        command: () => {
            setLocale('en');
        },
    },
    {
        icon: 'es',
        label: t('header.es'),
        command: () => {
            setLocale('es');
        },
    },
]);
</script>
