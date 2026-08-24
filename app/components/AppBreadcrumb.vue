<template>
    <div class="breadcrumb">
        <Breadcrumb
            :home="home"
            :model="breadcrumbs"
            :pt="{
                root: {
                    style: {
                        padding: '0 0 var(--spacer-ml)',
                        fontSize: '14px',
                        background: 'transparent',
                    },
                },
                itemLink: {
                    style: {
                        color: 'var(--notice-color)',
                        whiteSpace: 'nowrap',
                    },
                },
                separator: {
                    style: {
                        color: 'var(--notice-color)',
                    },
                },
            }"
        >
            <template #item="{ item, props }">
                <NuxtLink v-if="item.url" :to="item.url" v-bind="props.action">
                    <span v-if="item.icon" :class="item.icon" />
                    <span v-if="item.label">{{ item.label }}</span>
                </NuxtLink>
                <span v-else v-bind="props.action">
                    <span v-if="item.icon" :class="item.icon" />
                    <span v-if="item.label">{{ item.label }}</span>
                </span>
            </template>
        </Breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    breadcrumbs: any[];
}>();

const home = ref({
    icon: 'pi pi-home',
    url: '/',
});
</script>
