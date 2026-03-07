<template>
    <div class="folders-block">
        <div class="folders-block__labels">
            <div
                v-for="folder in props.folders"
                :key="folder.label"
                :class="[
                    `folders-block__label--${folder.color}`,
                    {
                        'folders-block__label--active': folder.label === activeFolder.label,
                    },
                ]"
                class="folders-block__label"
                @click="selectFolder(folder)"
            >
                <span>{{ folder.label }}</span>
            </div>
        </div>

        <div class="folders-block__tabs" :class="`folders-block__tabs--${activeFolder.color}`">
            <div
                v-for="tab in props.folders"
                :key="tab.label"
                :class="[
                    `folders-block__tab--${tab.color}`,
                    { 'folders-block__tab--active': tab.label === activeFolder.label },
                ]"
                class="folders-block__tab"
            >
                <PrivacyPolicy v-if="tab.label === 'Конфиденциальность'" />
                <PrivacyService v-if="tab.label === 'Персональные данные'" />
                <PrivacyOffer v-if="tab.label === 'Договор оферты'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Folder } from '@/types/folder';
import { ref } from 'vue';

const props = defineProps<{
    folders: Folder[];
}>();

const activeFolder = ref<Folder>(props.folders[0]!);

const selectFolder = (folder: Folder) => {
    activeFolder.value = folder;
};
</script>
