<template>
    <div class="page-privacy">
        <div class="container">
            <div class="page-privacy__content">
                <AppFoldersBlock :folders="folders" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Folder } from '@/types/folder';
const { t } = useI18n();

const folders: Folder[] = [
    {
        label: t('pages.legal.confidential-title'),
        color: 'peach',
        icon: 'privacy',
    },
    {
        label: t('pages.legal.conspiracy-title'),
        color: 'gray',
        icon: 'services',
    },
    {
        label: t('pages.legal.offer-title'),
        color: 'blue',
        icon: 'offer',
    },
];
</script>
