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
                <SvgIcon :name="folder.icon" />
                <span class="folders-block__label-title">{{ folder.label }}</span>
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
                <PrivacyPolicy
                    v-if="tab.label === $t('pages.legal.conspiracy-title')"
                    :content="privacyContent?.policy"
                    :loading="loading"
                />
                <PrivacyOffer
                    v-if="tab.label === $t('pages.legal.offer-title')"
                    :content="privacyContent?.offer"
                    :loading="loading"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Folder, FolderContent } from '@/types/folder';

const props = defineProps<{
    folders: Folder[];
    privacyContent: FolderContent | null;
    loading: boolean;
}>();

const activeFolder = ref<Folder>(props.folders[0]!);

const selectFolder = (folder: Folder) => {
    activeFolder.value = folder;
};
</script>
