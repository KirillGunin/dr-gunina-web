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

const folders: Folder[] = [
    {
        label: 'Конфиденциальность',
        color: 'peach',
    },
    {
        label: 'Персональные данные',
        color: 'gray',
    },
    {
        label: 'Договор оферты',
        color: 'blue',
    },
];
</script>
