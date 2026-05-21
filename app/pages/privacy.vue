<template>
    <div class="page-privacy">
        <div class="container">
            <div class="page-privacy__content">
                <AppFoldersBlock
                    :folders="folders"
                    :privacy-content="privacyContent"
                    :loading="loading"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchPrivacyContent } from '~/api/privacy';
import type { Folder, FolderContent } from '@/types/folder';

const { t } = useI18n();
const toast = useToast();

const privacyContent = ref<FolderContent | null>(null);
const loading = ref<boolean>(true);

const folders: Folder[] = [
    {
        label: t('pages.legal.conspiracy-title'),
        color: 'peach',
        icon: 'privacy',
    },
    {
        label: t('pages.legal.offer-title'),
        color: 'blue',
        icon: 'offer',
    },
];

fetchPrivacyContent()
    .then((response) => (privacyContent.value = response.data))
    .catch(() =>
        toast.add({
            severity: 'error',
            summary: t('errors.common.loading-error'),
            detail: t('errors.common.try-later'),
            life: 6000,
        })
    )
    .finally(() => (loading.value = false));
</script>
